#!/bin/bash

export DOCKER_HOST=172.17.0.1:2375
BRANCH=$(echo $GIT_BRANCH | tr '/' '\n' | tail -n1)
COMMIT=$(echo $GIT_COMMIT | cut -c1-7)
POSTFIX="${BRANCH}#$COMMIT"

# Build the client
cd client
docker build --rm -t "testify-client:${POSTFIX}" .
docker tag "testify-client:${POSTFIX}" "10.135.2.184:5000/testify-client:${POSTFIX}"
docker push "10.135.2.184:5000/testify-client:${POSTFIX}"
docker pull "10.135.2.184:5000/testify-client:${POSTFIX}"
cd ..

# Build the database
cd database
docker build --rm -t "testify-database:${POSTFIX}" .
docker tag "testify-database:${POSTFIX}" "10.135.2.184:5000/testify-database:${POSTFIX}"
docker push "10.135.2.184:5000/testify-database:${POSTFIX}"
docker pull "10.135.2.184:5000/testify-database:${POSTFIX}"
cd ..

# Build the server
cd server
docker build --rm -t "testify-server:${POSTFIX}" .
docker tag "testify-server:${POSTFIX}" "10.135.2.184:5000/testify-server:${POSTFIX}"
docker push "10.135.2.184:5000/testify-server:${POSTFIX}"
docker pull "10.135.2.184:5000/testify-server:${POSTFIX}"
cd ..

docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
