import toast from "react-hot-toast"
import { api } from "../services/api"
import { type Link, useLinkStore } from "../stores/link-store"
import { ButtonUi } from "./ui/button-ui"

type Props = {
  link: Link
}

export function LinkComponent({
  link: { id, originalLink, shortLink, accesses },
}: Props) {
  const { removeLink } = useLinkStore()
  const { href, host } = new URL(`${import.meta.env.VITE_FRONTEND_URL}/${shortLink}`)

  function handleCopyShortLink(): void {
    navigator.clipboard.writeText(href)
    toast.success("Link copiado com sucesso!")
  }

  async function handleDeleteLink(): Promise<void> {
    const result = confirm("Você tem certeza que desejar excluir o link?")

    if (result)
      await api
        .delete(`/links/${id}`)
        .then(() => {
          removeLink(id)
          toast.success("Link excluído com sucesso!")
        })
        .catch(() => {
          toast.error("Falha ao excluir o link!")
        })
  }

  return (
    <div className="flex justify-between items-center py-4 gap-3 border-t border-gray-200 last:pb-0">
      <div className="flex flex-col justify-center gap-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-base font-semibold text-sm leading-4 break-all  line-clamp-1 outline-none hover:underline focus:underline"
        >
          {host}/{shortLink}
        </a>

        <p className="text-gray-500 text-xs leading-3.5 break-all line-clamp-2">
          {originalLink}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-gray-500 text-xs leading-3.5 whitespace-nowrap">
          {accesses} acesso{accesses > 1 && "s"}
        </p>

        <div className="flex gap-1">
          <ButtonUi type="button" size="square" onClick={handleCopyShortLink}>
            <img src="/src/assets/copy.svg" alt="copiar" className="size-3" />
          </ButtonUi>

          <ButtonUi type="button" size="square" onClick={handleDeleteLink}>
            <img src="/src/assets/bin.svg" alt="excluir" className="size-3" />
          </ButtonUi>
        </div>
      </div>
    </div>
  )
}
