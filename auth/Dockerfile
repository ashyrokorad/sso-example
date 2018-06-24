FROM node:9.2
MAINTAINER Eugenge Usenko <iusenko@luxoft.com>

RUN mkdir -p /opt/app
WORKDIR /opt/server
COPY . . 

RUN npm install
RUN npm run build
WORKDIR /opt/server/dist

ENV APP_PORT 8080
EXPOSE $APP_PORT

CMD ["node", "index.js"]
