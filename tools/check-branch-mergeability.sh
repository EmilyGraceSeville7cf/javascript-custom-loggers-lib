#!/usr/bin/env bash

declare -ir SUCCESS=0
declare -ir WRONG_BRANCH=1

case "$GITHUB_BASE_REF" in
    dev)
        if [[ $GITHUB_HEAD_REF != @(feature|bugfix)/* ]]; then
            echo "Source branch must be \"feature/<issue-id>\" or \"bugfix/<issue-id>\" branch \
when merged to \"dev\", but now it is \"$GITHUB_HEAD_REF\"" >&2
            exit $WRONG_BRANCH
        fi
    ;;
    master)
        if [[ $GITHUB_HEAD_REF != dev ]]; then
            echo "Source branch must be \"dev\" branch \
when merged to \"master\", but now it is \"$GITHUB_HEAD_REF\"" >&2
            exit $WRONG_BRANCH
        fi
    ;;
    *)
        echo "Base branch must be \"dev\" or \"master\" branch, but now it is \"$GITHUB_BASE_REF\"." >&2
        exit $WRONG_BRANCH
    ;;
esac

exit $SUCCESS
