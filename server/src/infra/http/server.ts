import { fastifyCors } from "@fastify/cors"
import { fastifySwagger } from "@fastify/swagger"
import scalarUI from "@scalar/fastify-api-reference"
import { fastify } from "fastify"
import * as fastifyTypeProviderZod from "fastify-type-provider-zod"
import * as routes from "./routes"

const server = fastify()

server.setValidatorCompiler(fastifyTypeProviderZod.validatorCompiler)
server.setSerializerCompiler(fastifyTypeProviderZod.serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (fastifyTypeProviderZod.hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(422).send({
      message: "Data validation failed",
      issues: error.validation,
    })
  }

  return reply
    .status(500)
    .send({ message: `Internal server error, cause ${error.cause}` })
})

server.register(fastifyCors, {
  origin: "*",
  methods: ["POST", "GET", "PUT", "DELETE"],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brev Ly",
      version: "1.0.0",
      description: "A simple URL shortener service",
      summary: "Brev Ly API Documentation",
      contact: {
        name: "Deibson Cogo",
        email: "deibsoncogo@outlook.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/license/mit/",
      },
    },
  },
  transform: fastifyTypeProviderZod.jsonSchemaTransform,
})

server.register(scalarUI, {
  routePrefix: "/docs",
  configuration: { layout: "modern" },
})

server.register(routes.createLinkRoute)
server.register(routes.listLinkRoute)
server.register(routes.findShortLinkRoute)
server.register(routes.deleteLinkRoute)
server.register(routes.exportLinkRoute)

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!")
})
