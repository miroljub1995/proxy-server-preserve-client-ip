# ###### building go-mmproxy
# FROM golang:1.14-alpine as mm-builder
# RUN apk add --no-cache git
# RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go get github.com/path-network/go-mmproxy@2.0

# ###### building client
FROM node:12.18 as client
COPY client /app
WORKDIR /app
RUN npm i && npm run build

###### creating server
FROM hayd/alpine-deno:1.1.1

#setup mmproxy
# RUN apk add iproute2
# WORKDIR /app/
# COPY --from=mm-builder /go/bin/go-mmproxy ./
# COPY allowed-networks.txt ./
# EXPOSE 8082

#setup server
COPY --from=client /app/build /app/client
WORKDIR /app/server
COPY server/src .
RUN deno cache index.ts
EXPOSE 8080
CMD [ "run", "--allow-net", "--allow-read", "index.ts" ]