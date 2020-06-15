#!/bin/bash

# consts
IMAGE_NAME='dunja/pspcip/protected-proxy'

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
    docker run -it -p 8083:8083 -p 8084:8084 -p 8085:8085 --name=protected-proxy --cap-add=NET_ADMIN $IMAGE_NAME
    ;;
esac