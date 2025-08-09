FROM node:23-alpine

WORKDIR /filetransfer

COPY index.js package.json package-lock.json public views ./


RUN npm install

RUN mkdir uploads

EXPOSE 80

ENV HOST "http://localhost/"

ENTRYPOINT ["node", "index.js"]