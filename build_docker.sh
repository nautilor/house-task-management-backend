#!/bin/bash
version=`grep version package.json | sed 's/.*:\s"//g;s/",//g'`
docker buildx build --platform linux/amd64,linux/arm64,linux/arm . -t ghcr.io/nautilor/htm-backend:$version --output=type=registry --push
