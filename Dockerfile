FROM node:20.12.2-alpine

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY package*.json /tmp/app/
RUN cd /tmp/app && npm install

COPY . /usr/src/app
RUN cp -a /tmp/app/node_modules /usr/src/app
COPY ./startup.dev.sh /opt/startup.dev.sh
RUN chmod +x /opt/startup.dev.sh
RUN sed -i 's/\r//g' /opt/startup.dev.sh

WORKDIR /usr/src/app
RUN npm run build

CMD ["/opt/startup.dev.sh"]
