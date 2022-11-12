# Reviews API
Reviews api for e-commerce application

Steps to get this API running:
1. create a .env file in the root directory and fill in with values from the ec2 instance hosting the psql database:

SERVER_PORT=3000
PG_USER= ?
PG_HOST= ?
PG_DATABASE= ? (reviewsapi)
PG_PASSWORD= ?
PG_PORT=? (5432)

2. run " npm install "

3. run " npm server-production "