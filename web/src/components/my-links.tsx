import { useEffect, useState } from "react"
import type { Link } from "../interfaces/link"
import { api } from "../service/api"
import { LinkComponent } from "./link-component"
import { NoLinkComponent } from "./no-link-component"

export function MyLinks() {
  const [links, setLinks] = useState<Link[]>([])

  async function handleExportLinks() {
    await api.post("/links/csv").then(response => {
      window.open(response.data.reportUrl, "_blank")
    })
  }

  async function deleteLink(id: string): Promise<void> {
    await api.delete(`/links/${id}`).then(() => {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id))
    })
  }

  useEffect(() => {
    api.get("/links").then(({ data }) => {
      setLinks(data.links)
    })
  }, [])

  return (
    <section className="flex-1 w-full self-start max-w-[580px] bg-gray-100 rounded-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-gray-600 text-lg font-bold leading-6">Meus links</h1>

        <button
          type="button"
          onClick={handleExportLinks}
          disabled={links?.length === 0}
          className={`flex justify-center items-center text-center px-3 py-2 outline-blue-base bg-gray-200 rounded-sm text-gray-500 text-xs font-semibold ${links?.length > 0 ? "cursor-pointer opacity-100 hover:bg-gray-300" : "cursor-default opacity-50"} `}
        >
          <img src="/src/assets/download.svg" alt="download" className="pr-2" />
          Baixar CSV
        </button>
      </div>

      {links?.length === 0 ? (
        <NoLinkComponent />
      ) : (
        links.map(link => (
          <LinkComponent key={link.id} link={link} deleteLink={deleteLink} />
        ))
      )}
    </section>
  )
}
