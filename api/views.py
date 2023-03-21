from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import device, stoi, decode, BigramLanguageModel
import torch, joblib
import os

# model = joblib.load(os.getcwd() + "/api/model/prediction_model.joblib")
# m = model.to(device)
m = torch.load(os.getcwd() + "/api/model/prediction_model.pt", map_location ='cpu')

@api_view(['POST'])
def predict(request):
  n = len(request.data['body'])
  context = torch.zeros((1, n), dtype=torch.long, device=device)
  context[0] = torch.as_tensor([stoi[k] for _,k in enumerate(request.data['body'])])
  res = decode(m.generate(context, max_new_tokens=50)[0].tolist())
  return Response(res, status=status.HTTP_200_OK)