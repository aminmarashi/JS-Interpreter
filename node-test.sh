#!/bin/bash

export NVM_DIR=$HOME/.nvm
source $NVM_DIR/nvm.sh

current=$(nvm current)

if [ -z "$current" ]; then
    echo "Please install nvm"
    exit 1
fi

read -r -d '' versions <<EOF
16
18
20
EOF

for version in $versions; do
    nvm install $version
    nvm use $version
    ./test.sh
done

nvm use $current