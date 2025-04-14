/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_CODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
