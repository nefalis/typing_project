# Étape 1: Build du frontend React
FROM node:18 AS frontend

WORKDIR /app/frontend
COPY frontend/ . 

RUN npm install && npm run build

# Étape 2: Setup du backend Django
FROM python:3.10-alpine AS backend

WORKDIR /app

# Copier le code du backend
COPY typing_back/ ./typing_back/

# Copier le fichier requirements.txt
COPY typing_back/requirements.txt .

# Copier le build du front dans les fichiers statiques de Django
COPY --from=frontend /app/frontend/dist/ /app/typing_back/staticfiles/

# Installer les dépendances
RUN pip install -r requirements.txt

# Exécuter les migrations et collecter les fichiers statiques
WORKDIR /app/typing_back
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Exposer le port du serveur Django
EXPOSE 8000

# Lancer l’application Django avec Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "typing_back.wsgi:application"]
