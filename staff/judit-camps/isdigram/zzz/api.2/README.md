# API

## endpoints
- register user

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"Pepito Grillo","birthdate":"2000-01-01","email":"pepito@grillo.com","username":"pepitogrillo","password":"123qwe123"}' http://localhost:8080/users -v
```

- login user
```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"123qwe123"}' http://localhost:8080/users/auth -v
```

## methods

### POST
send data from the client side to the server side | __needs curl command__

### GET
request data from the server

### PATCH
update partial data already available in the database | __needs curl command__

### PUT
update data already available in the database | __needs curl command__

### DELETE
remove data from the database | __needs curl command__