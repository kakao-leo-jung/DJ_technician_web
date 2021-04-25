#!/bin/bash

#TODO : decorate
echo "WELCOME DJTechnician Web Authentication Server Runner!"

echo "rebuilding docker container and .jar files"
docker build -t web_authentication_server .
echo "docker build finished"
echo "Running Docker Web Authentication Server Container.."
docker run --rm -p 8082:8082 --name web_authentication_server web_authentication_server