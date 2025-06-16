import { NoLink } from "./no-link"

export function MyLinks() {
  return (
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

      <NoLink />
    </section>
  )
}
