#!/bin/bash

source env.sh
docker ps -a | awk '{ print $1,$2 }' | grep $IMAGE_NAME | awk '{print $1 }' | xargs -I {} docker stop {}
