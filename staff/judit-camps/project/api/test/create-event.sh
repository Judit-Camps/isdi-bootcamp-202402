curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjJmZDAzZWZiZTU0MzBlYjI2MmMzN2QiLCJyb2xlIjoib3JnYW5pemF0aW9uIiwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNzE0NDc5MTYxfQ.YHuvdZbrpRQEN8GrlaNnMv_Xb_X3fddkpVLTUZTNAMg" -H "Content-Type: application/json" -d '{"title":"Taller de pintura infantil","date":"2024-05-23","time":"17:00:00","description":"Taller per a nens de pintura en aquarel·la.","price":"0"}' http://localhost:9000/events -v