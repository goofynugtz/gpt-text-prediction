FROM anibali/pytorch:1.13.0-cuda11.8
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app/