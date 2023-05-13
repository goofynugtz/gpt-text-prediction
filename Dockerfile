FROM python:3.10
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
RUN apt-get update
RUN pip install --upgrade pip
COPY ./requirements.txt /app/requirements.txt
RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
RUN pip install -r requirements.txt
COPY . /app/
# RUN python manage.py makemigrations --no-input
# RUN python manage.py migrate --no-input
# RUN python manage.py collectstatic --no-input
ENTRYPOINT [ "bash", "deploy.sh" ]