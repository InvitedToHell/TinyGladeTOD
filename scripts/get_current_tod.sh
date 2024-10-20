#!/bin/bash
set -o errtrace # Enable the err trap, code will get called when an error is detected
trap 'echo ERROR: There was an error in ${FUNCNAME-main context}' ERR

base_dir=$1
api_url="https://ryeland.pouncelight.games"

# check for dependencies
for cmd in jq curl unzip; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "Error: $cmd is not installed." >&2
    exit 1
  fi
done

if [ ! -d "$base_dir" ]; then
  echo "Usage: $0 base_dir"
  exit 1
fi

cd "$base_dir" || exit

# create base structure
mkdir -p v1/blob
mkdir -p v1/event

cd v1 || exit

# get current event
response=$(curl -s -m 100 "$api_url/v1/events")
cid=$(jq -r '.events[0].cid' <<< "$response")

if [[ -z "$cid" ]]; then
  echo "no cid found: $response"
  exit
fi

if [[ "$cid" =~ [^a-zA-Z0-9] ]]; then
  echo "invalid cid"
  exit
fi

# update events
if [[ ! -f events ]]; then
  # no events file found, creating a new one...
  echo '{"events":[]}' > events
fi

new_events=$(jq -c --argjson new_obj "$response" '.events += $new_obj.events | .events |= (unique_by(.cid) | sort_by(.start))' events)

RESULT=$?
if [[ $RESULT -eq 0 ]]; then
  echo "$new_events" > events
else
  echo "couldn't update events collection"
fi

# download blob
cd blob || exit

if [[ ! -f "$cid" ]]; then
  if curl -sO -m 100 "$api_url/v1/blob/$cid"; then
    # Check if the file was downloaded successfully before unzipping
    if [[ -f "$cid" ]]; then
      unzip -q "$cid" -d "../event/$cid" || {
        echo "Failed to unzip $cid"
        exit 1
      }
    else
      echo "Download failed: $cid not found after curl"
      exit 1
    fi
  else
    echo "curl failed"
    exit 1
  fi
fi
