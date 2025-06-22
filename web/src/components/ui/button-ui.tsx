import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: "square" | "rectangular"
}

export function ButtonUi({ size, children, ...rest }: Props) {
  return (
    <button
      className={`flex justify-center items-center gap-2 rounded-sm bg-gray-200 border border-gray-200 text-xs font-semibold text-gray-500 outline-blue-base enabled:hover:border-blue-base enabled:cursor-pointer disabled:opacity-50 ${size === "rectangular" && "h-8 px-4"} ${size === "square" && "size-8"}`}
      {...rest}
    >
      {children}
    </button>
  )
}
