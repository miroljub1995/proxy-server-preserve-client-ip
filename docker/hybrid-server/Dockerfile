# building go-mmproxy
FROM golang:1.14-alpine as mm-builder
RUN apk add --no-cache git
RUN GO111MODULE=on CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go get github.com/path-network/go-mmproxy@2.0

# building client
FROM node:12.18 as client
ARG REACT_APP_API_ENDPOINT=http://localhost:8080/api
COPY client /app
WORKDIR /app
ENV REACT_APP_API_ENDPOINT=${REACT_APP_API_ENDPOINT}
RUN npm i && npm run build

# building server
FROM hayd/alpine-deno:1.8.2 as server
WORKDIR /app
COPY server/src ./src/
COPY server/import_map.json ./
COPY server/build.sh ./
RUN chmod +x build.sh
RUN ./build.sh

################################# final image
FROM hayd/alpine-deno:1.8.2

# copy mmproxy
RUN apk add iproute2 supervisor
WORKDIR /apps/mmproxy
COPY --from=mm-builder /go/bin/go-mmproxy ./
COPY allowed-networks.txt ./
COPY mmproxy.sh ./
EXPOSE 8082

# copy client
COPY --from=client /app/build /apps/client/

# copy server
# RUN apk add --no-cache libstdc++ libc6-compat
COPY --from=server /app/app /apps/server/
RUN chmod +x /apps/server/app
# ENV DB_URI='mongodb://mongo-db-0.mongo-db:27017,mongo-db-1.mongo-db:27017,mongo-db-2.mongo-db:27017,mongo-db-3.mongo-db:27017,mongo-db-4.mongo-db:27017/?replicaSet=repl-set0'

ADD supervisord.conf /etc/supervisor/conf.d/
ENTRYPOINT [ "supervisord" ]
CMD [ "-c", "/etc/supervisor/conf.d/supervisord.conf" ]
