interface ImportMetaEnv {
    readonly VITE_API_HOST_URL: string;
    // Adicione outras variáveis de ambiente se necessário
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  