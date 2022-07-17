data=$(cat << EOF

{
  "name": "hello$(date)"
}
EOF
)


curl -s -X POST \
-H "Content-Type: application/json" \
-d "$data" \
localhost:12000/api/account \
 | python3 -m json.tool
