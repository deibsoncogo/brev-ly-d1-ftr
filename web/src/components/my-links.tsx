import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { Link } from "../interfaces/link"
import { api } from "../service/api"
import { LinkComponent } from "./link-component"
import { NoLinkComponent } from "./no-link-component"

export function MyLinks() {
  const [links, setLinks] = useState<Link[]>([])

  async function handleExportLinks() {
    await api
      .post("/links/csv")
      .then(response => {
        window.open(response.data.reportUrl, "_blank")
        toast.success("Exportação executado com sucesso!")
      })
      .catch(() => {
        toast.error("Falha ao exportar os dados!")
      })
  }

  async function deleteLink(id: string): Promise<void> {
    await api.delete(`/links/${id}`).then(() => {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== id))
    })
  }

  useEffect(() => {
    api
      .get("/links")
      .then(({ data }) => {
        setLinks(data.links)
      })
      .catch(() => {
        toast.error("Falha ao listar os links!")
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
          className="flex justify-center items-center text-center px-3 py-2 bg-gray-200 border-2 border-gray-200 rounded-sm text-gray-500 text-xs font-semibold outline-blue-base disabled:opacity-50 enabled:cursor-pointer enabled:hover:border-blue-base"
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
