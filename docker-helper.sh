#!/bin/bash
docker info > /dev/null
if [[ $? -ne 0 ]]
then
  echo "Error: Could not invoke Docker!"
  echo "Maybe Docker is not installed on your system?"
  echo "It may also be possible that you do not have the permission to run Docker."
  echo "The later issue can be fixed by adding the current user to the docker group:"
  echo " "
  echo "    gpasswd -a user1 docker"
  echo "\nSee also: documentation/docker.md"
  exit 1
fi

# Build container.
docker build -t exportapp .
if [[ $? -ne 0 ]]
then
  echo "Error: Could not build container!"
  exit 1
fi

# Run container.
docker run -d -p 3000:3000 --net=host exportapp
if [[ $? -ne 0 ]]
then
  echo "Error: Could not start container!"
  exit 1
fi

# Everything is OK.
exit 0
