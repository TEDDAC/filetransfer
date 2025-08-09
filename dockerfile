FROM node:23-alpine

COPY index.js public/* package.json package-lock.json /filetransfer/

WORKDIR /filetransfer

RUN npm install

EXPOSE 80

ENV HOST "http://localhost/"

ENTRYPOINT ["node", "index.js"]