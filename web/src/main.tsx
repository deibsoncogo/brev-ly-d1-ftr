import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"
import { router } from "./router.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster
      position="bottom-right"
      containerClassName="text-gray-600 font-semibold text-sm leading-4"
      toastOptions={{
        duration: 2000,
        error: { duration: 7000 },
      }}
    />

    <RouterProvider router={router} />
  </StrictMode>
)
