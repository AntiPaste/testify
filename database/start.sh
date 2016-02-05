#!/bin/bash
docker rm -f testify-database
docker run -d -p 5432:5432 --name testify-database testify-database
