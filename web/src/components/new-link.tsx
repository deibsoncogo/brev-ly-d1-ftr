import { Input } from "./input"

export function NewLink() {
  return (
    <section className="flex flex-col flex-1 w-full max-w-[380px] gap-6 bg-gray-100 rounded-lg p-8">
      <h1 className="text-gray-600 text-lg font-bold leading-6">Novo link</h1>

      <div className="flex flex-col gap-3">
        <Input name="LINK ORIGINAL" placeholder="www.exemplo.com.br" />
        <Input name="LINK ENCURTADO" placeholder="brev.ly/" />
      </div>

      <button
        type="submit"
        className="bg-blue-base text-white text-sm leading-4 font-semibold rounded-lg p-5 cursor-pointer"
      >
        Salvar link
      </button>
    </section>
  )
}
