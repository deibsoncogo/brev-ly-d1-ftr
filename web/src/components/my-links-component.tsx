import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import type { LikInterface } from "../interfaces/link-interface"
import { api } from "../services/api"
import { LinkComponent } from "./link-component"
import { LoadingLinksComponent } from "./loading-links-component"
import { NoLinkComponent } from "./no-link-component"
import { TopLoadingBarComponent } from "./top-loading-bar-component"
import { ButtonUi } from "./ui/button-ui"

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
      })
      .catch(() => {
        toast.error("Falha ao listar os links!")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <section className="relative w-full max-w-[580px] flex-1 self-start overflow-hidden rounded-lg bg-gray-100 p-8">
      {isLoading && <TopLoadingBarComponent />}

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg leading-6 font-bold text-gray-600">Meus links</h1>

        <ButtonUi
          type="button"
          size="rectangular"
          onClick={handleExportLinks}
          disabled={links?.length === 0}
        >
          <img src="/src/assets/download.svg" alt="download" className="size-3" />
          Baixar CSV
        </ButtonUi>
      </div>

      {isLoading ? (
        <LoadingLinksComponent />
      ) : links?.length === 0 ? (
        <NoLinkComponent />
      ) : (
        links.map(link => (
          <LinkComponent key={link.id} link={link} deleteLink={deleteLink} />
        ))
      )}
    </section>
  )
}
