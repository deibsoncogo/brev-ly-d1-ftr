import { zodResolver } from "@hookform/resolvers/zod"
import { type FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { api } from "../services/api"
import { InputUi } from "./ui/input-ui"

export function NewLinkComponent() {
  const { host } = new URL(import.meta.env.VITE_FRONTEND_URL)

  const zodSchema = z.object({
    originalLink: z
      .string({ message: "Deve ser um texto" })
      .url({ message: "A URL deve ser válida" }),
    shortLink: z
      .string({ message: "Deve ser um texto" })
      .trim()
      .min(5, { message: "Deve conter pelo menos 5 caracteres" })
      .max(30, { message: "Pode conter no máximo 30 caracteres" }),
  })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: { originalLink: "", shortLink: "" },
  })

  const isHandleEditUserData =
    !watch("originalLink") || !watch("shortLink") || Object.values(errors).length > 0

  async function handleNewLink(data: FieldValues): Promise<void> {
    await api
      .post("/links", data)
      .then(() => {
        reset()
      })
      .catch(() => {
        toast.error("Falha ao criar um link!")
      })
  }

  return (
    <section className="flex w-full max-w-[380px] flex-1 flex-col gap-6 self-start rounded-lg bg-gray-100 p-8">
      <h1 className="text-lg leading-6 font-bold text-gray-600">Novo link</h1>

      <form onSubmit={handleSubmit(handleNewLink)} className="flex flex-col gap-4">
        <InputUi
          labelName="LINK ORIGINAL"
          placeholder="www.exemplo.com.br"
          isError={!!errors.originalLink}
          messageError={errors.originalLink?.message}
          {...register("originalLink")}
        />

        <InputUi
          labelName="LINK ENCURTADO"
          placeholder={`${host}/`}
          isError={!!errors.shortLink}
          messageError={errors.shortLink?.message}
          {...register("shortLink")}
        />

        <button
          type="submit"
          disabled={isHandleEditUserData || isSubmitting || isLoading}
          className={`bg-blue-base mt-2 cursor-pointer rounded-lg p-4 text-sm leading-4 font-semibold text-white disabled:opacity-50 ${isSubmitting || isLoading ? "cursor-progress" : "disabled:cursor-default"}`}
        >
          Salvar link
        </button>
      </form>
    </section>
  )
}
