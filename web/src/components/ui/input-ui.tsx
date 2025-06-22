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
        className={`group-focus-within:text-blue-base text-[10px] leading-3.5 ${isError ? "text-danger font-semibold" : "font-normal text-gray-500"}`}
      >
        {labelName}
      </label>

      <input
        type="text"
        className={`group-focus-within:text-blue-base outline-blue-base h-12 rounded-lg border-2 p-3 text-sm font-semibold placeholder-gray-400 ${isError ? "text-danger border-danger" : "border-gray-400 text-gray-600"}`}
        {...rest}
      />

      {isError && (
        <strong className="text-danger flex items-center gap-2 text-xs leading-4 font-semibold">
          <img src="/src/assets/error.svg" alt="error" className="h-3.5" />
          {messageError}
        </strong>
      )}
    </fieldset>
  )
}
