import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either"
import { NotFoundLinkError } from "./errors"

const zodSchema = z.object({
  id: z.string().uuid(),
})

type Input = z.input<typeof zodSchema>

export async function deleteLink(input: Input): Promise<Either<Error, unknown>> {
  const { id } = zodSchema.parse(input)

  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
  })

  if (!link) return makeLeft(new NotFoundLinkError())

  await db.delete(schema.links).where(eq(schema.links.id, id))

  return makeRight({})
}
