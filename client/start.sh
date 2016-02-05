#!/bin/bash
docker rm -f testify-client
docker run -d -p 8080:80 --name testify-client --link testify-server:server -v "$(pwd)/app:/app" testify-client
