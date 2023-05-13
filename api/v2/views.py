from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import predict_next_word

@api_view(['POST'])
def predict(request):
  context = (request.data['body'])
  print(type(context))
  res = predict_next_word(context, num_words=20)
  print(res)
  return Response(res, status=status.HTTP_200_OK)
