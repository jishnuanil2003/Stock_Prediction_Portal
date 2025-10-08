from django.urls import path,include
from accounts.views import RegisterView , ProtectedView
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from .views import StockPredictionAPIView

urlpatterns = [
    path("register/",RegisterView.as_view()),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protectedView/',ProtectedView.as_view()),
    path('predict/',StockPredictionAPIView.as_view(),name="stock_prediction")
]
