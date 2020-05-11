###### creating filter
FROM node:lts

#setup server
COPY package*.json ./
RUN npm install
COPY src src
EXPOSE 8002
CMD [ "npm", "start" ]