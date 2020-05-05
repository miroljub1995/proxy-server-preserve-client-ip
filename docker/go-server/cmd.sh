#!/bin/bash

# consts
IMAGE_NAME='dunja/pspcip/go-server'

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
    docker run -p 8090:8090 --ip="172.72.0.200" --name=go-server --network="my-net" -d $IMAGE_NAME
    ;;
esac