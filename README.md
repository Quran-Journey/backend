# Quran Journey Web App

## Development environment
We are using the PERN stack (Postgres, Express, React, Nginx). Please execute scripts in a linux environment that contains docker and node. It is recommended that you also have Postgres installed on your machine, but this is not necessary.

## Running the scripts

Note: the following scripts are to be executed from the top level folder.

Execute just the backend using `sh run_backend.sh`

Use an nginx docker image to run a small webserver locally:
`cd html; sh run.sh`

Run postgres alone using docker: `cd db; docker-compose up`. You can kill this by using docker-compose down in the same folder.

To run everything together the first time, execute `docker-compose up --build`. Every other time you can use `docker-compose up`.

Run the backend tests by executing `sh run_tests.sh`.

Compile the documentation by executing `cd docs; sh run.sh;` Serve the docs locally using `sh serve.sh`.
