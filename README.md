# Text Prediction
It's a Generative Pretrained Transformer (GPT) that takes in user input as the context and generates words as following that given context using an attention model (given by paper "Attention is All You Need").  
It is the basic GPT-1 implementation.

1. Create a virtual environment.
```bash
pip install -r requirements.txt
```
2. To deploy the project  
Make sure to have docker setup and running first
This will pull docker image of 4~5GB for pytorch-cuda.
```bash
docker compose build && docker compose up
```
3. Set up front-end
```bash
cd frontend/
yarn
yarn dev
```
Model training in detail is explained by [Andrej Karpathy](https://www.youtube.com/@AndrejKarpathy) in [this](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=5870s) video.