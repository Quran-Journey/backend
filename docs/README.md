# Docs

In order to generate the docs, we can run the script `sh run.sh`. This script will also run a docker build to serve the html file on localhost. To see how you can document the code yourself, take a look at the lesson files inside of the model and routes. The models are documented differently from how the routes are documented. After running `sh run.sh`, you'll see that an oas.json has been generated. You can identify similarities in the structure to the inline documentation from the model and routes folders.

You can also always reference the [swagger inline documentation](https://github.com/readmeio/swagger-inline) which contains some instructions on how to use swagger oas inline with the code. It's also a good idea to reference swagger oas yaml formats.
