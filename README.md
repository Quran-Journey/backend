### Quran Journey
This is the code for the Quran Journey webapp

# Development environment
We are using the PERN stack (Postgres, Nginx, React, Node).

### what to put in your .env
```
NODE_ENV=development
POSTGRES_USER=qj
POSTGRES_PASSWORD=Yatathakar123!
POSTGRES_HOST=localhost
POSTGRES_PORT=5434
POSTGRES_DB=quranJourney
```
Notice that the postgres port here is 5434, this is what is exposed inside of the standalone docker postgres database as can be seen inside of `db/docker-compose.yml`.

### Running the backend development environment
To run the backend for development purposes, you can execute `sh run_backend.sh`. This will stop any currently running standalone postgres containers, build a new image, serve nodemon.

### Developing with HTML (a simple site)
Here we are just using an nginx docker image to run a small webserver locally. You can serve this by going into the `html` folder and running `sh run.sh`. The website will then be accessible from localhost. I recommend not having this run in the background and that's why the server will output to stdout. 

### Using Postgres through docker instead of (installing postgres) 
It's recommended that you install and learn postgres on your own, but if you'd just like to have the postgres database for development purposes you can use `docker-compose` inside of the `db` folder. You can find more instructions there.

### Mocking Production
You only ever want to mock the production environment when you want to see how the entire project comes together. To mock production you can use `docker-compose up --build` to build the script. Every other time you can use `docker-compose up`. To stop the container just use `ctrl+c` once. To run docker compose in the background just use the `-d` flag (detatched mode) when using `up`. To stop the container in detached mode (or after force exiting) use `docker-compose down`.

You can find more info about the project itself in [this google doc](https://docs.google.com/document/d/1etpJXnfR6HdE4orYqiEjL678yQtYyru4K99wQufqMGg/edit?usp=sharing). Feel free to leave comments.
