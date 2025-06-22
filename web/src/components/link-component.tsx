import toast from "react-hot-toast"
import type { LikInterface } from "../interfaces/link-interface"
import { ButtonUi } from "./ui/button-ui"

type Props = {
  link: LikInterface
  deleteLink: (id: string) => Promise<void>
}

export function LinkComponent({
  link: { id, originalLink, shortLink, accesses },
  deleteLink,
}: Props) {
  const { href, host } = new URL(`${import.meta.env.VITE_FRONTEND_URL}/${shortLink}`)

  function handleCopyShortLink(): void {
    navigator.clipboard.writeText(href)
    toast.success("Copiado com sucesso!")
  }

  async function handleDeleteLink(): Promise<void> {
    await deleteLink(id)
      .then(() => {
        toast.success("Excluído com sucesso!")
      })
      .catch(() => {
        toast.error("Falha ao excluir o link!")
      })
  }

  return (
    <div className="flex items-center justify-between gap-3 border-t border-gray-200 py-4 last:pb-0">
      <div className="flex flex-col justify-center gap-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-base line-clamp-1 text-sm leading-4 font-semibold break-all outline-none hover:underline focus:underline"
        >
          {host}/{shortLink}
        </a>

        <p className="line-clamp-2 text-xs leading-3.5 break-all text-gray-500">
          {originalLink}
        </p>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-xs leading-3.5 whitespace-nowrap text-gray-500">
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
