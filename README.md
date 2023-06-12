# Quran Journey Backend

## Development Environment
We are using the PERN stack (Postgres, Node/Express, React, Nginx). These scripts work best in a unix environment running docker and node. It is recommended that you also have Postgres installed on your machine, but this is not necessary as you can spin up a docker postgres container in the db folder.

## Scripts

Note: the following scripts are to be executed from the top level folder.

Execute just the backend using `sh run_backend.sh`

Use an nginx docker image to run a small webserver locally:
`cd html; sh run.sh`

Run postgres alone using docker: `cd db; docker-compose up`. You can kill this by using docker-compose down in the same folder.

To run everything together the first time, execute `docker-compose up --build`. Every other time you can use `docker-compose up`.

Run the backend tests by executing `sh run_tests.sh`.

Compile the documentation by executing `cd docs; sh run.sh;` Serve the docs locally using `sh serve.sh`.

If you are running postgres on a local machine, please note that you will also need to configure your postgres server to use the credentials laid out in the .env file. You can find some SQL schemas and data in the `./db`. From that folder, you can also run `sh backup.sh`. This will generate an SQL dump that contains some mock data.

Note: when running `docker-compose` with the `-d` flag, you can access logs using `docker-compose logs`.
