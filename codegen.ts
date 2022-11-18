import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'https://nxlppvxwouvddpyfntil.nhost.run/v1/graphql': {
      headers: { 'x-hasura-admin-secret': '18ba5b0a87ec200311434be8f20d8347' },
    },
  },
  documents: 'libs/**/*.graphql',
  generates: {
    'libs/shared/data/src/lib/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
