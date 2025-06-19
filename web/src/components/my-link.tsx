export function MyLink() {
  return (
    <div className="flex justify-between items-center py-4 border-t border-gray-200">
      <div className="flex flex-col justify-center gap-1">
        <strong className="text-sm leading-4 font-semibold text-blue-base">
          brev.ly/Portfolio-Dev
        </strong>

        <a href="http://" className="text-xs leading-3.5 text-gray-500">
          devsite.portifolio.com.br/devname-123456
        </a>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-xs leading-3.5 text-gray-500">30 acessos</p>

        <div className="flex gap-1">
          <button
            type="button"
            className="flex justify-center items-center size-8 bg-gray-200 rounded-sm cursor-pointer outline-blue-base hover:bg-gray-300"
          >
            <img src="/src/assets/copy.svg" alt="copiar" className="size-3" />
          </button>

          <button
            type="button"
            className="flex justify-center items-center size-8 bg-gray-200 rounded-sm cursor-pointer outline-blue-base hover:bg-gray-300"
          >
            <img src="/src/assets/bin.svg" alt="excluir" className="size-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
