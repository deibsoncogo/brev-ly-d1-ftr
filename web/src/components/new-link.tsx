import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { type FieldValues, useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../service/api"
import { Input } from "./ui/input-ui"

export function NewLink() {
  const [isErrorField, setIsErrorFieldApi] = useState<FieldValues>({})

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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      originalLink: "",
      shortLink: `${import.meta.env.VITE_BASE_URL_FRONTEND}/`,
    },
  })

  const isHandleEditUserData =
    !watch("originalLink") || !watch("shortLink") || Object.values(errors).length > 0

  async function handleNewLink(data: FieldValues): Promise<void> {
    setIsErrorFieldApi({})

    await api
      .post("/links", data)
      .then(response => {
        console.log("response =>", response)
      })
      .catch(({ response }) => {
        if (response.data.error.data) setIsErrorFieldApi(response.data.error.data)
      })
  }

  return (
    <section className="flex flex-col flex-1 w-full max-w-[380px] gap-6 bg-gray-100 rounded-lg p-8">
      <h1 className="text-gray-600 text-lg font-bold leading-6">Novo link</h1>

      <form onSubmit={handleSubmit(handleNewLink)} className="flex flex-col gap-4">
        <Input
          labelName="LINK ORIGINAL"
          placeholder="www.exemplo.com.br"
          isError={!!errors.originalLink || isErrorField.name === watch("originalLink")}
          messageError={errors.originalLink?.message}
          {...register("originalLink")}
        />

        <Input
          labelName="LINK ENCURTADO"
          placeholder="brev.ly/"
          isError={!!errors.shortLink || isErrorField.name === watch("shortLink")}
          messageError={errors.shortLink?.message}
          {...register("shortLink")}
        />

        <button
          type="submit"
          disabled={isHandleEditUserData}
          className="mt-2 p-5 bg-blue-base text-white text-sm leading-4 font-semibold rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          Salvar link
        </button>
      </form>
    </section>
  )
}
