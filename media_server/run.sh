#!/bin/bash

#TODO : decorate
echo "WELCOME DJTechnician Media Server Runner!"

echo "rebuilding docker container and .war files"
docker build -t media_server .
echo "docker build finished"
echo "Running Docker WebSocket Server Container.."
docker run --rm -p 8081:8081 --name media_server media_server