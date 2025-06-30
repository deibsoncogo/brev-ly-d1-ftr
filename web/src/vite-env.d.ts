/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
  readonly VITE_FRONTEND_URL: string
  readonly VITE_FAKE_EXPORT_SVG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
