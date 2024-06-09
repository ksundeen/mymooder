#!/usr/bin/env bash
set -eo pipefail 

if [ -z  "$*" ]; then
  CMD="${PROJECT} --help"
elif [ "$*" = "console" ]; then
  CMD="sleep infinity"
else
  CMD="$*"
fi

pushd "${NONROOT_HOME}/opt/${PROJECT}" > /dev/null
source venv/bin/activate
echo "${CMD}"
eval " ${CMD}"
popd > /dev/null