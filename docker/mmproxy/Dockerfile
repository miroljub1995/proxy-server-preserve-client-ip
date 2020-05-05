# FROM ubuntu

# RUN apt update
# RUN apt install -y iproute2 tar wget

# WORKDIR /usr/local
# RUN wget https://dl.google.com/go/go1.14.2.linux-amd64.tar.gz
# RUN tar -C /usr/local -xzf go1.14.2.linux-amd64.tar.gz

FROM golang:alpine as builder
RUN apk add --no-cache git
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go get github.com/path-network/go-mmproxy

FROM ubuntu
RUN apt update
RUN apt install -y iproute2

COPY --from=builder /go/bin/go-mmproxy /app/
COPY allowed-networks.txt /app/
COPY start.sh /app/
WORKDIR /app
CMD [ "bash", "./start.sh" ]