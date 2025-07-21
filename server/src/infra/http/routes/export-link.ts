import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { exportLinks } from "../../../app/function/export-links"
import { isRight, unwrapEither } from "../../shared/either"

export const exportLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    "/links/csv",
    {
      schema: {
        summary: "Export links as CSV",
        description: "Export all links as a CSV file",
        tags: ["Links"],
        response: {
          201: z.object({ reportUrl: z.string().url() }).describe("Exported"),
          500: z.object({ message: z.string() }).describe("Internal server error"),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinks()

      if (isRight(result)) {
        const { reportUrl } = unwrapEither(result)
        return reply.status(201).send({ reportUrl })
      }

      throw new Error()
    }
  )
}
