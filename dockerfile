FROM node:23-alpine

COPY index.js public/ views/ package.json package-lock.json /filetransfer/ 

WORKDIR /filetransfer

RUN npm install

RUN mkdir uploads

EXPOSE 80

ENV HOST "http://localhost/"

ENTRYPOINT ["node", "index.js"]