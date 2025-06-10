import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { deleteLink } from "../../../app/function/delete-link"
import { isRight, unwrapEither } from "../../shared/either"

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete short link",
        description: "Delete a short link by its ID",
        tags: ["Links"],
        params: z.object({
          id: z.string().uuid().describe("The ID of the short link to delete"),
        }),
        response: {
          204: z.null().describe("Deleted"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteLink({
        id,
      })

      if (isRight(result)) return reply.status(204).send()

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case "NotFoundLinkError":
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
