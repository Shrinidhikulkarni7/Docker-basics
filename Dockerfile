FROM node:10

WORKDIR /app/web

COPY . /app/web

EXPOSE 8081

CMD [ "node", "index.js" ]


