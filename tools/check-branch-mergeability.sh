#!/usr/bin/env bash

message=
declare -i status=0

if [[ $GITHUB_HEAD_REF == @(feature|bugfix)/* ]]; then
    message='Source branch is correct.'
else
    message="Source ($GITHUB_HEAD_REF) branch is incorrect: it must be feature or bugfix branch."
    status+=1
fi

if [[ $GITHUB_BASE_REF == "dev" ]]; then
    message+="\nBase branch is correct."
else
    message+="\nBase ($GITHUB_BASE_REF) branch is incorrect: it must be dev branch."
    status+=1
fi

echo -e "$message"
(( status == 0 ))
exit $?
