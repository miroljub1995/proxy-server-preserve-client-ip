#!/bin/bash

# consts
IMAGE_NAME='local/pspcip/hybrid-server-deno'
IMAGE_NAME_C_DEV='local/pspcip/hybrid-server-deno-c-dev'
IMAGE_NAME_S_DEV='local/pspcip/hybrid-server-deno-s-dev'

case $1 in
rebuild)
    docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker rm {} &&
    docker rmi $IMAGE_NAME
    docker build -t $IMAGE_NAME --build-arg REACT_APP_API_ENDPOINT=$2 .
    ;;
stop)
    docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker stop {}
    ;;
start)
    docker run -p 8082:8082 -p 8080:8080 --name=hybrid-server-deno --cap-add NET_ADMIN --network="my-net" -it $IMAGE_NAME
    ;;
esac