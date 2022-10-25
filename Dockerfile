FROM node:alpine AS frontend
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
ENTRYPOINT [ "npm","start" ]