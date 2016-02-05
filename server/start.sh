#!/bin/bash
docker rm -f testify-server
docker run -d -p 8000:8000 --name testify-server --link testify-database:database testify-server
