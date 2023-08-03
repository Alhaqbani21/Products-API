# storefront-backend

Develop an API based on stakeholder requirements. Design the database schema, tables, and columns to meet these requirements. Refer to the provided REQUIREMENT.md for information about the database schema and API route details.

# Installation:

`npm install`

# To run the programm
- make sure if you want to run the porgram in development to change ENV to dev in .env file  it is not automated 

# To run the porgram in test phase 
- make sure to change the ENV to test in .env file 


`npm run start`

# .env Variables

- POSTGRES_HOST=127.0.0.1
- POSTGRES_DB=store_front
- POSTGRES_TEST_DB=store_front_test
- POSTGRES_USER=
- POSTGRES_PASSWORD=
- ENV=dev
- SALT_ROUNDS=10
- BCRYPT_PASSWORD=exodus-fencing-huskiness
- TOKEN_SECRET=diffused

# ports

The server port: 3000
database port: 5432

# Authentication

Authentication tokens are sent within the HTTP header.

`Authorization   Bearer <token>`



# API Endpoints

API Endpoints are mentioned in REQUIREMENTS.md
