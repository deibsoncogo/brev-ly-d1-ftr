import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  labelName: string
  isError: boolean
  messageError: string | undefined
}

export function InputUi({ labelName, isError, messageError, ...rest }: Props) {
  return (
    <label className="flex flex-col text-gray-500 text-[10px] leading-3.5 ">
      {labelName}

      <input
        type="text"
        className={`h-12 mt-2 p-3 rounded-lg border-2 placeholder-gray-400 text-gray-600 text-sm font-semibold outline-blue-base focus:text-blue-base ${isError ? "border-danger" : "border-gray-400"}`}
        {...rest}
      />

      {isError && (
        <strong className="flex items-center pt-2 gap-2 text-xs leading-4 font-semibold text-gray-500">
          <img src="/src/assets/error.svg" alt="error" className="h-3.5" />
          {messageError}
        </strong>
      )}
    </label>
  )
}
