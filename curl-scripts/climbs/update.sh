#!/bin/bash

API="http://localhost:4741"
URL_PATH="/climbs"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "climb": {
    "name": "'"${NAME}"'",
    "rating": "'"${RATING}"'",
    "grade": "'"${GRADE}"'"
    }
  }'

echo
