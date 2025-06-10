import { desc } from "drizzle-orm"
import { db } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import { type Either, makeRight } from "../../infra/shared/either"

type Output = {
  links: {
    id: string
    originalLink: string
    shortLink: string
    accesses: number
    createdAt: Date
  }[]
}

export async function listLink(): Promise<Either<never, Output>> {
  const result = await db
    .select()
    .from(schema.links)
    .orderBy(desc(schema.links.createdAt))

  return makeRight({
    links: result,
  })
}
