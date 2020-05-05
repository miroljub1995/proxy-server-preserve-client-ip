#!/bin/bash

# consts
IMAGE_NAME='dunja/pspcip/tcpdump'

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
    docker run --cap-add NET_ADMIN --name=tcpdump --ip="172.16.0.200" --network=host $IMAGE_NAME
    ;;
esac