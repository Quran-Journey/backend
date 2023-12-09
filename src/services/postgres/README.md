# Postgres
The purpose of this folder is to interact with the tables in the database. Services should make use of models to structure data pulled from the database.

`connect.ts` is used to connect to the database. You will notice it uses `.env` vars so these will need to be appropriately set up before usage. Also notice that we attempt to connect 5 times with a 5 second delay between each attempt. This is in order to ensure that if any databases need time to spin up, they have had sufficient time to do so.

`index.ts` contains all of our direct database interactions. This is where we `create`, `retrieve`, `update`, and `remove` any data.

Ideally, in the future, `connect.ts` and `index.ts` should be moved into a separate repository and treated as part of a separate library (to be used in other projects as well).

The remaining files in this folder are named after the sql tables they primarily interact with, although there is some overlap.
