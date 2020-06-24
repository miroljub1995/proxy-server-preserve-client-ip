#!/bin/bash

# consts
IMAGE_NAME='local/pspcip/hybrid-server-deno'

case $1 in
rebuild)
    docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker rm {} &&
    docker rmi $IMAGE_NAME
    docker build -t $IMAGE_NAME .
    ;;
stop)
    docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker stop {}
    ;;
start)
    docker run -p 8082:8082 -p 8080:8080 --name=hybrid-server-deno --cap-add NET_ADMIN --network="my-net" -it $IMAGE_NAME
    ;;
esac