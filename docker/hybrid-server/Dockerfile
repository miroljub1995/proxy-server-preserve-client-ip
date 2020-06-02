###### building go-mmproxy
FROM golang:1.14-alpine as mm-builder
RUN apk add --no-cache git
RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go get github.com/path-network/go-mmproxy@v2.0

###### creating server
FROM node:12-alpine

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