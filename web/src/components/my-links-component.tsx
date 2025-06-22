import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { LikInterface } from "../interfaces/link-interface"
import { api } from "../services/api"
import { LinkComponentComponent } from "./link-component"
import { LoadingLinksComponent } from "./loading-links-component"
import { NoLinkComponent } from "./no-link-component"
import { TopLoadingBarComponent } from "./top-loading-bar-component"

export function MyLinksComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState<LikInterface[]>([])

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
        setIsLoading(false)
      })
      .catch(() => {
        toast.error("Falha ao listar os links!")
      })
  }, [])

  return (
    <section className="relative w-full max-w-[580px] flex-1 self-start overflow-hidden rounded-lg bg-gray-100 p-8">
      {isLoading && <TopLoadingBarComponent />}

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg leading-6 font-bold text-gray-600">Meus links</h1>

        <button
          type="button"
          onClick={handleExportLinks}
          disabled={links?.length === 0}
          className="outline-blue-base enabled:hover:border-blue-base flex items-center justify-center rounded-sm border-2 border-gray-200 bg-gray-200 px-3 py-2 text-center text-xs font-semibold text-gray-500 enabled:cursor-pointer disabled:opacity-50"
        >
          <img src="/src/assets/download.svg" alt="download" className="pr-2" />
          Baixar CSV
        </button>
      </div>

      {isLoading ? (
        <LoadingLinksComponent />
      ) : links?.length === 0 ? (
        <NoLinkComponent />
      ) : (
        links.map(link => (
          <LinkComponentComponent key={link.id} link={link} deleteLink={deleteLink} />
        ))
      )}
    </section>
  )
}
