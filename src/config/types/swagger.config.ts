interface SwaggerConfigApi {
  name: string;
  description: string;
  version: string;
}

interface SwaggerConfigDocs {
  path: string;
}

export interface SwaggerConfig {
  api: SwaggerConfigApi;
  docs: SwaggerConfigDocs;
}
