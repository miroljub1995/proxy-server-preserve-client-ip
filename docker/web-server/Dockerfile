FROM node:12.16.3

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src src
EXPOSE 8080
CMD [ "npm", "start" ]