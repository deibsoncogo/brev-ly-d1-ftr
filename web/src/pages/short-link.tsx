import { Link, useLoaderData } from "react-router-dom"
import type { ShortLinkLoaderOutput } from "../loaders/short-link"

export function ShortLink() {
  const { originalLink } = useLoaderData() as ShortLinkLoaderOutput

  function redirectToOriginalLink() {
    window.location.href = originalLink
  }

  setTimeout(redirectToOriginalLink, 3000)

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="py-16 rounded-lg bg-gray-100 flex flex-col justify-center items-center max-w-[580px] p-5 m-5 gap-6">
        <img src="/src/assets/icon.svg" alt="404" className="w-11" />

        <h2 className="text-gray-600 text-2xl font-bold leading-8">Redirecionando...</h2>

        <p className="text-center text-gray-500 text-sm font-semibold leading-5">
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
