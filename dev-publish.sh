#!/bin/bash

nrm use hypers
npm unpublish rsuite-checkpicker@3.0.0-next.1
npm run build
npm publish