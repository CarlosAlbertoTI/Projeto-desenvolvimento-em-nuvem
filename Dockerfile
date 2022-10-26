FROM node:16-alpine AS frontend

WORKDIR /usr/src/react-app

COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
ENTRYPOINT [ "npm","start" ]