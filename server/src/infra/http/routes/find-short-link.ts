import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { findShortLink } from "../../../app/function/find-short-link"
import { isRight, unwrapEither } from "../../shared/either"

export const findShortLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    "/links/:shortLink",
    {
      schema: {
        summary: "Find short link",
        description: "Retrieve the original link and access count for a given short link",
        tags: ["Links"],
        params: z.object({
          shortLink: z.string().trim().min(5).max(50).describe("The desired short link"),
        }),
        response: {
          200: z
            .object({ originalLink: z.string(), accesses: z.number() })
            .describe("Original link found"),
          404: z
            .object({
              statusCode: z.number(),
              name: z.string(),
              message: z.string(),
              field: z.string(),
              value: z.string(),
            })
            .describe("Not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params

      const result = await findShortLink({
        shortLink,
      })

      if (isRight(result)) {
        const { originalLink, accesses } = unwrapEither(result)
        return reply.status(200).send({ originalLink, accesses })
      }

      const { statusCode, name, message, field, value } = unwrapEither(result)

      switch (name) {
        case "NotFoundLinkError":
          return reply.status(404).send({ statusCode, name, message, field, value })
      }
    }
  )
}
