import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="m-5 flex max-w-[580px] flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 p-5 py-16">
        <img src="/src/assets/404.svg" alt="404" className="w-44" />

        <h2 className="text-2xl leading-8 font-bold text-gray-600">
          Link não encontrado
        </h2>

        <p className="text-center text-sm leading-5 font-semibold text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é uma URL
          inválida. Saiba mais em{" "}
          <Link to="/" className="text-blue-base underline">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
