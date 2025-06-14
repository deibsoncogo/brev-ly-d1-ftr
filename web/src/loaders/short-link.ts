import type { LoaderFunctionArgs } from "react-router-dom"
import { api } from "../service/api"

type Params = {
  shortLink: string
}

export type ShortLinkLoaderOutput = {
  accesses: number
  originalLink: string
}

export async function shortLinkLoader({
  params,
}: LoaderFunctionArgs): Promise<ShortLinkLoaderOutput> {
  const { shortLink } = params as Params
  console.log("data =>", import.meta.env.API_URL)

  const { data } = await api.get(`/links/${shortLink}`)

  return data
}
