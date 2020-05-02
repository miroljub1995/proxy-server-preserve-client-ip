#!/bin/bash

source env.sh
docker run -p 8080:8080 -d $IMAGE_NAME