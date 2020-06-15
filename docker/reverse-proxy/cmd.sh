#!/bin/bash

# consts
IMAGE_NAME='local/pspcip/reverse-proxy'

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
    docker run -p 8083:8083 -p 8084:8084 -p 8085:8085 --name=rev-proxy --network="my-net" $IMAGE_NAME
    ;;
esac