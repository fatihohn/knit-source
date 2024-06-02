#!/bin/bash
set -e

/usr/local/bin/pocketbase serve --http=0.0.0.0:8090 --dir=/pb_data --publicDir=/pb_public --dev
