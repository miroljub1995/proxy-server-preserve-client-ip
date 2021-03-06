#!/bin/bash

# consts
IMAGE_NAME='local/pspcip/lb-for-docker'

case $1 in
rebuild)
    docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker rm {} &&
    docker rmi $IMAGE_NAME
    docker build -t $IMAGE_NAME .
    ;;
# stop)
#     docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker stop {}
#     ;;
start)
    docker run -p 8080:8080 -itd --name=lb-for-docker --cap-add=NET_ADMIN $IMAGE_NAME
    ;;
start-cloud)
    docker run -p 8080:8080 -itd --name=lb-for-docker --cap-add=NET_ADMIN miroljub1995/pspcip_lb-for-docker:latest
    ;;
esac
