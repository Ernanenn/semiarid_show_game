// Permite importar arquivos .jsx e .js sem erros de tipo
// Isso permite migração gradual para TypeScript

declare module '*.jsx' {
  import { ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

declare module '*.js' {
  const content: any;
  export default content;
  export = content;
}

