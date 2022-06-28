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

## High-Level Architecture 

[Click here to see an image depicting the technologies used in this project.](https://user-images.githubusercontent.com/35634011/171746819-db404bc7-ed8f-4ad5-a65c-7d1d43051e62.png) 

[Click here to view the relationship to other projects within the Quran Journey development scope.](https://user-images.githubusercontent.com/35634011/171746913-332d998f-88c2-4b9d-84c7-fa189e104a5e.png)
