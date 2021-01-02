#!/bin/bash

#TODO : decorate
echo "WELCOME DJTechnician WebSocket Server Runner!"

echo "rebuilding docker container and .war files"
docker build -t web_socket_server .
echo "docker build finished"
echo "Running Docker WebSocket Server Container.."
docker run --rm -p 8080:8080 --name web_socket_server web_socket_server


