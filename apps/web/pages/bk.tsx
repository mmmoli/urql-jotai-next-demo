import {
  isSSR,
  nhost,
  ProjectList,
  ProjectListDocument,
  ProjectListQuery,
  ProjectListQueryVariables,
} from '@mmmoli/shared/data';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { getNhostSession } from '@nhost/nextjs';
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
  makeOperation,
} from 'urql';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { authExchange } from '@urql/exchange-auth';
import { NextPageWithLayout } from './_app';
import Layout from '../components/layout/layout';

type ProjectListPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ProjectListPage: NextPageWithLayout<ProjectListPageProps> = () => {
  return (
    <>
      <h1>Projects</h1>
      <ProjectList />
    </>
  );
};

ProjectListPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

type ServersideProps = {
  dehydratedState?: unknown;
};

type Params = {
  projectId: string;
};

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

//#region Auth

const addAuthToOperation = ({ authState, operation }: any) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        ...{
          Authorization: `Bearer ${authState.token}`,
        },
      },
    },
  });
};

const didAuthError = ({ error }: any) => {
  console.log({ error });
  return error.graphQLErrors.some(
    (e: any) => e.extensions?.code === 'FORBIDDEN'
  );
};

type AuthState = {
  token: string;
  refreshToken: string;
} | null;

//#endregion

export const getServerSideProps: GetServerSideProps<
  ServersideProps,
  Params
> = async (context) => {
  // TODO: Get BACKEND_URL from somewhere else…

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: nhost.graphql.getUrl(),
      exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange<AuthState>({
          getAuth: async ({ authState }) => {
            if (isSSR) {
              const nhostSession = await getNhostSession(BACKEND_URL, context);
              if (!nhostSession) return null;
              return {
                token: nhostSession.accessToken,
                refreshToken: nhostSession.refreshToken,
              };
            } else {
              if (!nhost.auth.isAuthenticated()) {
                const token = nhost.auth.getAccessToken();
                const refreshToken = localStorage.getItem('refresh_token');
                if (token && refreshToken) {
                  return { token, refreshToken };
                }
                return null;
              }
              return null;
            }
          },
          addAuthToOperation,
          didAuthError,
        }),
        ssrCache,
        fetchExchange,
      ],
    },
    false
  );

  await client
    .query<ProjectListQuery, ProjectListQueryVariables>(
      ProjectListDocument,
      undefined
    )
    .toPromise();

  return {
    props: {
      dehydratedState: ssrCache.extractData(),
    },
  };
};

export default withUrqlClient((ssrExchange) => ({
  url: nhost.graphql.getUrl(),
}))(ProjectListPage);
