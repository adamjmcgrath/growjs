#!/bin/bash
#
# Copyright 2012 Adam Mcgrath.
#
# Tools for compiling JavaScript using the Closure Compiler.

CLOSURE_LIB=~/dev/libs/javascript/closure-library
CLOSURE_DEPSWRITER_PATH=$CLOSURE_LIB/closure/bin/build/depswriter.py

$CLOSURE_DEPSWRITER_PATH \
  --root_with_prefix="grow/ grow/" \
  > grow/deps.js
echo 'Written deps to grow/deps.js'
