import { z } from "zod"
import { db } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import { type Either, makeLeft, makeRight } from "../../infra/shared/either"
import { AlreadyExistsError } from "./errors"

const zodSchema = z.object({
  originalLink: z.string().url(),
  shortLink: z.string().trim().min(5).max(30),
})

type Input = z.input<typeof zodSchema>

type Output = {
  link: {
    id: string
    originalLink: string
    shortLink: string
    accesses: number
    createdAt: Date
  }
}

export async function createLink(
  input: Input
): Promise<Either<AlreadyExistsError, Output>> {
  const { originalLink, shortLink } = zodSchema.parse(input)

  const shortLinkAlreadyExists = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortLink, shortLink),
  })

  if (shortLinkAlreadyExists) {
    return makeLeft(new AlreadyExistsError("shortLink", shortLink))
  }

  const [result] = await db
    .insert(schema.links)
    .values({ originalLink, shortLink })
    .returning()

  return makeRight({ link: result })
}
