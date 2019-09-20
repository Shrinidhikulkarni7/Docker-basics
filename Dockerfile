FROM node:10

WORKDIR /app/web

COPY . /app/web

RUN npm install

EXPOSE 8081

CMD [ "node", "index.js" ]


