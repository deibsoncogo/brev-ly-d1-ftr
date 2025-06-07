import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either"
import { NotFoundLinkError } from "./errors/not-found-link-error"

const deleteLinkInput = z.object({
  id: z.string().uuid(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

type DeleteLinkOutput = {
  status: true
}

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<Error, DeleteLinkOutput>> {
  const { id } = deleteLinkInput.parse(input)

  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.id, id),
  })

  if (!link) return makeLeft(new NotFoundLinkError())

  await db.delete(schema.links).where(eq(schema.links.id, id))

  return makeRight({ status: true })
}
