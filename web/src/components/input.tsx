interface Props {
  name: string
  placeholder: string
}

export function Input({ name, placeholder }: Props) {
  return (
    <label className="text-gray-500 text-[10px] leading-3.5 mb-2 flex flex-col">
      {name}
      <input
        type="text"
        placeholder={placeholder}
        className="h-12 mt-2 p-3 rounded-lg border border-gray-400 placeholder-gray-400 text-gray-600 text-sm font-semibold outline-blue-base focus:text-blue-base"
      />
    </label>
  )
}
