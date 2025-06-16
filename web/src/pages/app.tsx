export function App() {
  return (
    <main className="flex flex-col w-full max-w-[992px] p-5 mx-auto mt-[10vh]">
      <img src="/src/assets/logo.svg" alt="brev.ly" className="w-24 pb-8" />

      <div className="flex w-full gap-8">
        <section className="flex flex-col flex-1 w-full max-w-[380px] gap-6 bg-gray-100 rounded-lg p-8">
          <h1 className="text-gray-600 text-lg font-bold leading-6">Novo link</h1>

          <div className="flex flex-col gap-3">
            <label className="text-gray-500 text-[10px] leading-3.5 mb-2 flex flex-col">
              LINK ORIGINAL
              <input
                type="text"
                placeholder="www.exemplo.com.br"
                className="h-12 mt-2 p-3 rounded-lg border border-gray-400 placeholder-gray-400 text-gray-600 text-sm font-semibold outline-blue-base focus:text-blue-base"
              />
            </label>

            <label className="text-gray-500 text-[10px] leading-3.5 mb-2 flex flex-col">
              LINK ENCURTADO
              <input
                type="text"
                placeholder="brev.ly/"
                className="h-12 mt-2 p-3 rounded-lg border border-gray-400 placeholder-gray-400 text-gray-600 text-sm font-semibold outline-blue-base focus:text-blue-base"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-base text-white text-sm leading-4 font-semibold rounded-lg p-5 cursor-pointer"
          >
            Salvar link
          </button>
        </section>

        <section className="flex-1 w-full self-start max-w-[580px] bg-gray-100 rounded-lg p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-600 text-lg font-bold leading-6">Meus links</h1>

            <button
              type="button"
              className="flex items-center px-3 py-2 bg-gray-200 rounded-sm text-gray-500 text-xs font-semibold cursor-pointer"
            >
              <img src="/src/assets/download.svg" alt="download" className="pr-2" />
              Baixar CSV
            </button>
          </div>

          <div className="flex flex-col justify-center items-center mt-5 border-t border-gray-200">
            <img src="/src/assets/link.svg" alt="link" className="w-7 mt-8" />

            <p className="mt-3 text-gray-500 text-[10px] leading-3.5">
              AINDA NÃO EXISTE LINKS CADASTRADOS
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
