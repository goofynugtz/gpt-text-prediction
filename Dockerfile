FROM pytorch/pytorch
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
RUN apt-get update
# RUN apt-get install curl -y
RUN pip install --upgrade pip
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app/
RUN python manage.py makemigrations --no-input
RUN python manage.py migrate --no-input
RUN python manage.py collectstatic --no-input
# RUN python manage.py runserver
# ENTRYPOINT [ "bash","./deploy.sh" ]