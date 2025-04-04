# Étape 1 : Build du frontend
FROM node:18-alpine AS frontend

WORKDIR /app/frontend

# Copie du code source du frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./
RUN npm run build
RUN ls -l /app/frontend/dist/

# Étape 2 : Build du backend
FROM python:3.10-alpine

WORKDIR /typing_project

# Copier le backend
COPY typing_back ./

# Copier les fichiers générés par le frontend dans le dossier des fichiers statiques du backend
# COPY --from=frontend /app/frontend/dist/ /typing_project/staticfiles/
COPY /frontend/dist /typing_back/staticfiles

RUN ls -l /typing_back/staticfiles/

# Installation des dépendances backend
RUN pip install -r requirements.txt

# Exécution des migrations Django
RUN python manage.py migrate

# Collecte des fichiers statiques
RUN python manage.py collectstatic --noinput

# Exposer le port
EXPOSE 8000

# Lancer le serveur Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
