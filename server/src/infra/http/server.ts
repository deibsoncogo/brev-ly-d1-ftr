import { fastifyCors } from "@fastify/cors"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { fastify } from "fastify"
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"
import { createShortLinkRoute } from "./routes/create-short-link"

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(422).send({
      message: "Data validation failed",
      issues: error.validation,
    })
  }

  return reply.status(500).send({ message: "Internal server error" })
})

server.register(fastifyCors, { origin: "*" })

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
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

server.register(createShortLinkRoute)

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running!")
})
