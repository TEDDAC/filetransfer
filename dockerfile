FROM node:23-alpine

WORKDIR /filetransfer

COPY index.js package.json package-lock.json ./
COPY public/ ./public/
COPY views/ ./views/


RUN npm install

RUN mkdir uploads

EXPOSE 80

ENV HOST "http://localhost/"

ENTRYPOINT ["node", "index.js"]