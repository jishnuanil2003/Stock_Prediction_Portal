from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, style={'input_type':'password'}, min_length=6,)
    class Meta:
        model = User
        fields = ['username','password','email']
        

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user   