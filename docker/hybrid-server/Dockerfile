# ###### building go-mmproxy
FROM golang:1.14-alpine as mm-builder
RUN apk add --no-cache git
RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go get github.com/path-network/go-mmproxy@2.0

# ###### building client
FROM node:12.18 as client
ARG REACT_APP_API_ENDPOINT=http://localhost:8080/api
COPY client /app
WORKDIR /app
ENV REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT}
RUN npm i && npm run build

###### creating server
FROM hayd/alpine-deno:1.1.1

# setup mmproxy
RUN apk add iproute2 supervisor
WORKDIR /apps/mmproxy
COPY --from=mm-builder /go/bin/go-mmproxy ./
COPY allowed-networks.txt ./
COPY mmproxy.sh ./
EXPOSE 8082

# setup server
COPY --from=client /app/build /apps/client
WORKDIR /apps/server
COPY server/src .
COPY server/import_map.json .
RUN deno cache --unstable index.ts
# download mogno lib at image build, not at run
RUN deno run --allow-net --allow-read --allow-write --allow-plugin --unstable https://deno.land/x/mongo@v0.8.0/mod.ts
EXPOSE 8080
ENV DB_URI='mongodb://mongo-db-0.mongo-db:27017,mongo-db-1.mongo-db:27017,mongo-db-2.mongo-db:27017,mongo-db-3.mongo-db:27017,mongo-db-4.mongo-db:27017/?replicaSet=repl-set0'
ADD supervisord.conf /etc/supervisor/conf.d/
# CMD [ "run", "--allow-net", "--allow-read", "--allow-write", "--unstable", "--allow-plugin", "--allow-env", "index.ts" ]
ENTRYPOINT [ "supervisord" ]
CMD [ "-c", "/etc/supervisor/conf.d/supervisord.conf" ]
# WORKDIR /apps/mmproxy
# ENTRYPOINT [ "./go-mmproxy" ]
# CMD [ "-l", "0.0.0.0:8082", "-4", "127.0.0.1:8080", "-v", "2" ]