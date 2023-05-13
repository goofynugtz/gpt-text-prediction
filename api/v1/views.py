from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import device, stoi, decode, BigramLanguageModel
import torch
import os

standard_model = torch.load(os.getcwd() + "/api/v1/model/standard/prediction_model.pt", map_location ='cpu')
shakespeare_model = torch.load(os.getcwd() + "/api/v1/model/shakespeare/prediction_model.pt", map_location ='cpu')

@api_view(['POST'])
def predict_standard(request):
  n = len(request.data['body'])
  context = torch.zeros((1, n), dtype=torch.long, device=device)
  context[0] = torch.as_tensor([stoi[k] for _,k in enumerate(request.data['body'])])
  res = decode(standard_model.generate(context, max_new_tokens=50)[0].tolist())
  return Response(res, status=status.HTTP_200_OK)

@api_view(['POST'])
def predict_shakespeare(request):
  n = len(request.data['body'])
  context = torch.zeros((1, n), dtype=torch.long, device=device)
  context[0] = torch.as_tensor([stoi[k] for _,k in enumerate(request.data['body'])])
  res = decode(shakespeare_model.generate(context, max_new_tokens=50)[0].tolist())
  return Response(res, status=status.HTTP_200_OK)
