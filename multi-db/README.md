docker exec -it mongodb \
mongo --host localhost -u admin -p nosqldev --authenticationDatabase admin \
--eval "db.getSiblingDB('herois').createUser({user: 'paulolins', pwd:'dev1478', roles: [{role: 'readWrite', db: 'herois'}]})"
