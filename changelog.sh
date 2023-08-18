#! /bin/sh

FROM=$1
TO=$2
if [ -z "$FROM" -o -z "$TO" ]; then
  echo "Usage: $0 <from> <to>"
  exit 1
fi

TODAY=$(date '+%Y-%m-%d')
function filter {
    grep -iv demo | grep -iv improve | grep -iv comment | grep -iv doc | grep -iv compile | grep -iv bump
}

pushd original-repo >/dev/null
logfile=`mktemp`

git log --oneline --no-merges $FROM..$TO | sed 's/^[a-z0-9]*/-/' | sed > $logfile
cat <<EOF
## [X.X.X] - $TODAY

Commit: [$TO](https://github.com/NeilFraser/JS-Interpreter/tree/$TO)

### Added

$(cat $logfile | grep -i add | filter)

### Removed

$(cat $logfile | grep -i remove | filter)

### Fixed

$(cat $logfile | grep -i fix | filter)

### Other

$(cat $logfile | grep -iv add | grep -iv remove | grep -iv fix | filter)
EOF

popd >/dev/null