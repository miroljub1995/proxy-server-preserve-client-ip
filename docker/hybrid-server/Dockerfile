###### building go-mmproxy
FROM golang:alpine as mm-builder
RUN apk add --no-cache git
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go get github.com/path-network/go-mmproxy

###### creating server
FROM node:lts-alpine

#setup mmproxy
RUN apk add iproute2
WORKDIR /app/
COPY --from=mm-builder /go/bin/go-mmproxy ./
COPY allowed-networks.txt ./
EXPOSE 8082

#setup server
COPY package*.json ./
RUN npm install
COPY src src
EXPOSE 8080

COPY entry.sh entry.sh
CMD [ "sh", "entry.sh" ]