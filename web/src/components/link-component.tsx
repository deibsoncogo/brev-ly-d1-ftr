import toast from "react-hot-toast"
import type { Link } from "../interfaces/link"

type Props = {
  link: Link
  deleteLink: (id: string) => Promise<void>
}

export function LinkComponent({
  link: { id, originalLink, shortLink, accesses },
  deleteLink,
}: Props) {
  const { href, host } = new URL(`${import.meta.env.VITE_URL_FRONTEND}/${shortLink}`)

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
    <div className="flex justify-between items-center py-4 last:pb-0 gap-3 border-t border-gray-200">
      <div className="flex flex-col justify-center gap-1">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm leading-4 font-semibold text-blue-base hover:underline outline-none focus:underline"
        >
          {host}/{shortLink}
        </a>

        <p className="text-xs leading-3.5 text-gray-500 ">{originalLink}</p>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-xs leading-3.5 text-gray-500">
          {accesses} acesso{accesses > 1 && "s"}
        </p>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleCopyShortLink}
            className="flex justify-center items-center size-8 bg-gray-200 border-2 border-gray-200 rounded-sm cursor-pointer outline-blue-base hover:border-blue-base"
          >
            <img src="/src/assets/copy.svg" alt="copiar" className="size-3" />
          </button>

          <button
            type="button"
            onClick={handleDeleteLink}
            className="flex justify-center items-center size-8 bg-gray-200 border-2 border-gray-200 rounded-sm cursor-pointer outline-blue-base hover:border-blue-base"
          >
            <img src="/src/assets/bin.svg" alt="excluir" className="size-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
