import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { createLink } from "../../../app/function/create-link"
import { isRight, unwrapEither } from "../../shared/either"

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a short link",
        description: "Create a new short link for an existing URL",
        tags: ["Links"],
        body: z.object({
          originalLink: z.string().url().describe("The original URL to shorten"),
          shortLink: z.string().trim().min(5).max(50).describe("The desired short link"),
        }),
        response: {
          200: z
            .object({
              link: z.object({
                id: z.string(),
                originalLink: z.string(),
                shortLink: z.string(),
                accesses: z.number(),
                createdAt: z.date(),
              }),
            })
            .describe("Created"),
          409: z
            .object({
              statusCode: z.number(),
              name: z.string(),
              message: z.string(),
              field: z.string(),
              value: z.string(),
            })
            .describe("Value already exists"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body

      const result = await createLink({
        originalLink,
        shortLink,
      })

      if (isRight(result)) {
        const { link } = unwrapEither(result)
        return reply.status(201).send({ link })
      }

      const { statusCode, name, message, field, value } = unwrapEither(result)

      switch (name) {
        case "AlreadyExistsError":
          return reply.status(409).send({ statusCode, name, message, field, value })
      }
    }
  )
}
