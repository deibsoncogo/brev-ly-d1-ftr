/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_URL_FRONTEND: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
