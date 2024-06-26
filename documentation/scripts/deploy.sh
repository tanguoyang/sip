#!/bin/bash

if [ "$1" == "production" ]; then
    firebase use liftauth
    firebase target:apply hosting docs-production liftauthdocs
    firebase deploy --only hosting:docs-production
elif [ "$1" == "staging" ]; then
    firebase use liftauth-staging
    firebase target:apply hosting docs-staging liftauthdocs-staging1
    firebase deploy --only hosting:docs-staging
else
    echo "Invalid argument. Please provide either 'production' or 'staging'."
fi