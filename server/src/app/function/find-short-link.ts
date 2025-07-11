import { eq } from "drizzle-orm"
import { z } from "zod"
import { db } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either"
import { NotFoundLinkError } from "./errors"

const zodSchema = z.object({
  shortLink: z.string().trim().min(5).max(50),
})

type Input = z.input<typeof zodSchema>

type Output = {
  originalLink: string
  accesses: number
}

export async function findShortLink(
  input: Input
): Promise<Either<NotFoundLinkError, Output>> {
  const { shortLink } = zodSchema.parse(input)

  const link = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortLink, shortLink),
  })

  if (!link) return makeLeft(new NotFoundLinkError("shortLink", shortLink))

  const [newLink] = await db
    .update(schema.links)
    .set({ accesses: link.accesses + 1 })
    .where(eq(schema.links.id, link.id))
    .returning()

  return makeRight({
    originalLink: newLink.originalLink,
    accesses: newLink.accesses,
  })
}
