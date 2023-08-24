# Services
This folder hosts all of the code that interacts with the different services that we use.

## Current services

### Firebase
Primarily used for authentication, we connect to a firebase account and use `firebase-admin` to verify user credentials.

### Postgres
We use the `postgres` folder to interact with the tables in the database. Services should make use of models to structure data pulled from the database.
