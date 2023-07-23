# storefront-backend

Develop an API based on stakeholder requirements. Design the database schema, tables, and columns to meet these requirements. Refer to the provided REQUIREMENT.md for information about the database schema and API route details.

# Installation:

`npm install`

# To run the programm

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
