#!/bin/bash -x
if test -z "$1" ; then 
    echo DO NOT LOAD "$1"
    
else
  echo "$1";
  if [ "$1" == 1 ]; then
    echo "node ../ loader.js"
  fi
fi