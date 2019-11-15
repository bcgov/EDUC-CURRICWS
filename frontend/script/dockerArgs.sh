#!/bin/bash -x
if test -z $1 ; then 
    echo "DO NOT LOAD $1"
    
else
  echo "node loader.js" 
  echo "LOAD DATA $1"
fi