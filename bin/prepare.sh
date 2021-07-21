#!/bin/bash 
# Shell script to write property to package.json file
jq -e '.type = "module"' package.json > package.json.tmp && cp package.json.tmp package.json && rm package.json.tmp