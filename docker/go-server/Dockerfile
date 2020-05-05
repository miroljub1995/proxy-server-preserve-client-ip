FROM golang

WORKDIR /app
COPY server.go server.go
RUN go build -o server server.go
CMD [ "./server" ]