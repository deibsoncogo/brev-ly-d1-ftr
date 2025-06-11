import { PassThrough, Transform } from "node:stream"
import { pipeline } from "node:stream/promises"
import { stringify } from "csv-stringify"
import { db, pg } from "../../infra/db"
import { schema } from "../../infra/db/schemas"
import { type Either, makeRight } from "../../infra/shared/either"
import { uploadFileToStorage } from "../../infra/storage/upload-file-to-storage"

type Output = {
  reportUrl: string
}

export async function exportLinks(): Promise<Either<never, Output>> {
  const { sql, params } = db
    .select({
      originalLink: schema.links.originalLink,
      shortLink: schema.links.shortLink,
      accesses: schema.links.accesses,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(20)

  const csv = stringify({
    delimiter: ";",
    header: true,
    columns: [
      { key: "originalLink", header: "Original Link" },
      { key: "shortLink", header: "Short Link" },
      { key: "accesses", header: "Accesses" },
      { key: "createdAt", header: "Created At" },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: "links",
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
