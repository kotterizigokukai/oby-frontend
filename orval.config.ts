import { defineConfig } from 'orval';

export default defineConfig({
  oby: {
    input: 'http://localhost:8080/v3/api-docs',
    output: {
      target: 'src/api/generated',
      mode: 'tags',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/api/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
