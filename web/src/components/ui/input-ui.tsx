import type { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  labelName: string
  isError: boolean
  messageError: string | undefined
}

export function InputUi({ labelName, isError, messageError, ...rest }: Props) {
  return (
    <fieldset className="group flex flex-col gap-2">
      <label
        htmlFor={rest.id}
        className={`group-focus-within:text-blue-base text-[10px] leading-3.5 ${isError ? "font-semibold text-danger" : "font-normal text-gray-500"}`}
      >
        {labelName}
      </label>

      <input
        type="text"
        className={`group-focus-within:text-blue-base h-12 p-3 rounded-lg border-2 placeholder-gray-400 text-sm font-semibold outline-blue-base ${isError ? "text-danger border-danger" : "text-gray-600 border-gray-400"}`}
        {...rest}
      />

      {isError && (
        <strong className="flex items-center gap-2 text-xs text-danger font-semibold leading-4">
          <img src="/src/assets/error.svg" alt="error" className="h-3.5" />
          {messageError}
        </strong>
      )}
    </fieldset>
  )
}
