import { createBrowserRouter } from "react-router-dom"
import { App } from "./pages/app"
import { NotFound } from "./pages/not-found"
import { ShortLink } from "./pages/short-link"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:shortLink",
    element: <ShortLink />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
