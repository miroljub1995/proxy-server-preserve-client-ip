#!/bin/bash

# consts
IMAGE_NAME='local/pspcip/snort-for-docker'

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
    docker run -d -it --name=snort1-for-docker --cap-add=NET_ADMIN $IMAGE_NAME
    ;;
start2)
    docker run -d -it --name=snort1-for-docker --cap-add=NET_ADMIN $IMAGE_NAME
    ;;
start1-cloud)
    docker run -d -it --name=snort1-for-docker --cap-add=NET_ADMIN miroljub1995/pspcip_snort-for-docker:latest
    ;;
start2-cloud)
    docker run -d -it --name=snort2-for-docker --cap-add=NET_ADMIN miroljub1995/pspcip_snort-for-docker:latest
    ;;
esac
