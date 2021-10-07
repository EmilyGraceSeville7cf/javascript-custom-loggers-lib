#!/usr/bin/env bash

declare -ir SUCCESS=0
declare -ir NO_TAG_ERROR=1

git checkout HEAD

last_tag=$(git tag | sed -En '/v/p' | sort -r | head -n 1)

if [[ -z $last_tag ]]; then
    echo "No version tag found." >&2
    exit $NO_TAG_ERROR
fi

current_sha=$(git rev-parse HEAD)
last_tag_sha=$(git rev-parse "$last_tag")

if [[ "$last_tag_sha" != "$current_sha" ]]; then
    echo "\"$current_sha\" must have \"$last_tag\", which points now to \"$last_tag_sha\" commit." >&2
    exit $NO_TAG_ERROR
fi

exit $SUCCESS
