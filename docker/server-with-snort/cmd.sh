#!/bin/bash

# consts
IMAGE_NAME='local/pspcip/server-with-snort'

case $1 in
rebuild)
    docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker rm {} &&
    docker rmi $IMAGE_NAME
    docker build -t $IMAGE_NAME .
    ;;
# stop)
#     docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker stop {}
#     ;;
start1)
    docker run -d -it --name=test-snort1 --cap-add=NET_ADMIN $IMAGE_NAME
    ;;
start2)
    docker run -d -it --name=test-snort2 --cap-add=NET_ADMIN $IMAGE_NAME
    ;;
esac