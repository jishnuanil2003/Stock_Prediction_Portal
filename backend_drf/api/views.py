from django.shortcuts import render
from .Serializers import StockPredictionSerializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from datetime import datetime
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import os
from django.conf import settings
from .url import save_image
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model

# Create your views here.
class StockPredictionAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        serializer = StockPredictionSerializers(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            now = datetime.now()
            start = datetime(now.year-10,now.month,now.day)
            end = now
            df = yf.download(ticker,start,end)
            if df.empty:
                return Response({"error":"No Data Found for this Ticker Name",'status':status.HTTP_404_NOT_FOUND})
            df = df.reset_index()
            print(df)
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close)
            plt.title(ticker)
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()

            #save image in media folder
            plot_image_path = f'{ticker}_plot.png'
            plot_img = save_image(plot_image_path)

            #100 days moving average
            MA_100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close)
            plt.plot(MA_100,'r',label='100 DMA')
            plt.title(f'{ticker} 100 Days Moving Average Price')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()

            #save 100 DMA in media folder
            plot_image_path = f'{ticker}_100DMA_plot.png'
            plot_img_100DMA = save_image(plot_image_path)

            #200 days moving average
            MA_200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close)
            plt.plot(MA_100,'r',label='100 DMA')
            plt.plot(MA_200,'b',label='200 DMA')
            plt.title(f'{ticker} 200 Days Moving Average Price')
            plt.xlabel('Days')
            plt.ylabel('Close price')
            plt.legend()

            #save 200 DMA in media folder
            plot_image_path = f'{ticker}_200DMA_plot.png'
            plot_img_200DMA = save_image(plot_image_path)

            #predict future data

            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.70)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.70): int(len(df))])

            scaler = MinMaxScaler(feature_range=(0,1))
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i, 0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            model = load_model('stock_prediction_model.keras')   
            y_predicted = model.predict(x_test)
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            #plot predicted graph

            plt.figure(figsize=(12,6))
            plt.plot(y_test, 'b', label='Original Price')
            plt.plot(y_predicted, 'r', label='Predicted Price')
            plt.title(f'{ticker} Predicted Price')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            
            #save predicted price in media folder
            plot_image_path = f'{ticker}_predicted_plot.png'
            plot_predicted_plot = save_image(plot_image_path)


            return Response({"status": "Success",'plot_img':plot_img,'plot_img_100DMA':plot_img_100DMA,'plot_img_200DMA':plot_img_200DMA,'plot_predicted_plot':plot_predicted_plot})