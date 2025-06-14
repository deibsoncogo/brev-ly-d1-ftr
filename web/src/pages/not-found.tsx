import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="py-16 rounded-lg bg-gray-100 flex flex-col justify-center items-center max-w-[580px] p-5 m-5 gap-6">
        <img src="/src/assets/404.svg" alt="404" className="w-44" />

        <h2 className="text-gray-600 text-2xl font-bold leading-8">
          Link não encontrado
        </h2>

        <p className="text-center text-gray-500 text-sm font-semibold leading-5">
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
