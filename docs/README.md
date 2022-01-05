# Docs

We are using [OAS 2.0](https://swagger.io/docs/specification/2-0) to document our code and [redoc](https://github.com/Redocly/redoc) to format it into html. This process has already partially been automated and we are using some time saving tools along the way. Documentation, therfore, should be easy and therefore highly encouraged.

In order to generate the docs, we can run the script `sh run.sh`. This script will also run a docker build to serve the html file on localhost. To see how you can document the code yourself, take a look at the lesson files inside of the model and routes. The models are documented differently from how the routes are documented. After running `sh run.sh`, you'll see that an oas.json has been generated. You can identify similarities in the structure to the inline documentation from the model and routes folders.

You can also always reference the [swagger inline documentation](https://github.com/readmeio/swagger-inline) which contains some instructions on how to use swagger oas inline with the code. It's also a good idea to reference swagger oas yaml formats.

What inline documentation looks like:
![image](./assets/img/docsCodeExample.png)

Notice how little effort that comment is. You are able to document the endpoint so that other people can see it in an easy and visually appealing way with less than 20 lines!

Here's how that inline documentation looks after it's been processed with `run.sh`:
![image](./assets/img/docsExample.png)



References:
- [petstore redoc html example](https://redocly.github.io/redoc/)
- [petstore yaml example](https://redocly.github.io/redoc/openapi.yaml)
- [redoc "extensions"](https://github.com/Redocly/redoc/blob/master/docs/redoc-vendor-extensions.md#x-logo)