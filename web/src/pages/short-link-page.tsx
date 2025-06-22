import { Link, useLoaderData } from "react-router-dom"
import type { ShortLinkLoaderOutput } from "../loaders/short-link-loader"

export function ShortLinkPage() {
  const { originalLink } = useLoaderData() as ShortLinkLoaderOutput

  function redirectToOriginalLink() {
    window.location.href = originalLink
  }

  setTimeout(redirectToOriginalLink, 1000)

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="m-5 flex max-w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 p-5 py-16">
        <img src="/src/assets/icon.svg" alt="404" className="w-11" />

        <h2 className="text-2xl leading-8 font-bold text-gray-600">Redirecionando...</h2>

        <p className="text-center text-sm leading-5 font-semibold text-gray-500">
          O link será aberto automaticamente em alguns instantes. Não foi redirecionado?{" "}
          <Link to={originalLink} className="text-blue-base underline">
            Acesse aqui
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
