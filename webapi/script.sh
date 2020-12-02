echo '\n requesting all peoples'
curl --silent localhost:8080/peoples

echo '\n\n requesting one people'
curl --silent localhost:8080/peoples/1

echo '\n\n requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:8080/peoples

echo '\n\n creating new people'
CREATE=$(curl --silent -X POST \
    --data-binary '{"name": "Eusinho", "age": 100, "power": "psi"}' \
    localhost:8080/peoples)

echo $CREATE

ID=$(echo $CREATE | jq .id)

echo '\n\n requesting last people'
curl --silent localhost:8080/peoples/$ID
