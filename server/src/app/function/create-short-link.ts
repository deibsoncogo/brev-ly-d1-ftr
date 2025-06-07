import { z } from "zod"
import { db } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import type { links } from "../../infra/db/schemas/links"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either"
import { AlreadyExistsError } from "./errors/already-exists-error"

const createShortLinkInput = z.object({
  originalLink: z.string().url(),
  shortLink: z.string().trim().min(5).max(50),
})

type CreateShortLinkInput = z.input<typeof createShortLinkInput>

type CreateShortLinkOutput = {
  link: typeof links.$inferInsert
}

export async function createShortLink(
  input: CreateShortLinkInput
): Promise<Either<Error, CreateShortLinkOutput>> {
  const { originalLink, shortLink } = createShortLinkInput.parse(input)

  const shortLinkAlreadyExists = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortLink, shortLink),
  })

  if (shortLinkAlreadyExists) return makeLeft(new AlreadyExistsError())

  const [result] = await db
    .insert(schema.links)
    .values({
      originalLink,
      shortLink,
    })
    .returning()

  return makeRight({
    link: result,
  })
}
