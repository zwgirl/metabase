#! /usr/bin/env bash

set -euo pipefail

# switch to the Metabase root directory
script_directory=`dirname "${BASH_SOURCE[0]}"`
cd "$script_directory/.."

source "./bin/check-clojure-cli.sh"
check_clojure_cli

cd bin/release
clojure -M -m release $@
