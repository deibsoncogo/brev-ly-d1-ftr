import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "square" | "rectangular"
}

export function ButtonUi({ size, children, ...rest }: Props) {
  return (
    <button
      className={`outline-blue-base enabled:hover:border-blue-base flex items-center justify-center gap-2 rounded-sm border border-gray-200 bg-gray-200 text-xs font-semibold text-gray-500 enabled:cursor-pointer disabled:opacity-50 ${size === "rectangular" && "h-8 px-4"} ${size === "square" && "size-8"}`}
      {...rest}
    >
      {children}
    </button>
  )
}
