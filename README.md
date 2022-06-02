# Quran Journey Web App

## High-Level Architecture 
Quran Journey is a web app that also utilizes a microservice project from [Quran Journey/roots](https://github.com/Quran-Journey/roots).

Below is the architecture of just the web app.

![Web App](https://user-images.githubusercontent.com/35634011/171746819-db404bc7-ed8f-4ad5-a65c-7d1d43051e62.png)

Below is the overall architecture of the entire project. The frontend of this web app connects to Node from the roots microservice, where roots serves as an API. 

![Overall Diagram](https://user-images.githubusercontent.com/35634011/171746859-4a996d80-99bc-4923-bfcb-3d0b94e9c443.png)

## Development Environment
We are using the PERN stack (Postgres, Express, React, Nginx). Please execute scripts in a linux environment that contains docker and node. It is recommended that you also have Postgres installed on your machine, but this is not necessary.

## Running the Scripts

Note: the following scripts are to be executed from the top level folder.

Execute just the backend using `sh run_backend.sh`

Use an nginx docker image to run a small webserver locally:
`cd html; sh run.sh`

Run postgres alone using docker: `cd db; docker-compose up`. You can kill this by using docker-compose down in the same folder.

To run everything together the first time, execute `docker-compose up --build`. Every other time you can use `docker-compose up`.

Run the backend tests by executing `sh run_tests.sh`.

Compile the documentation by executing `cd docs; sh run.sh;` Serve the docs locally using `sh serve.sh`.
