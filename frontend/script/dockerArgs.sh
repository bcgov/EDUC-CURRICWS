#!/bin/bash -x
if test -z $1 ; then 
    echo "LOAD $1"
    echo "node loader.js"
else 
  echo "DO NOT LOAD"
fi