from django.urls import path
from .views import predict_standard, predict_shakespeare

urlpatterns = [
    path('', predict_standard, name='standard-prediction'),
    path('shakespeare/', predict_shakespeare, name='shakespeare-prediction'),
]
