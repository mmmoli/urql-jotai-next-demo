import {
  getSsrUrqlClient,
  ProjectList,
  withAuthUrqlClient,
} from '@mmmoli/shared/data';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import {
  ProjectListDocument,
  ProjectListQuery,
  ProjectListQueryVariables,
} from 'libs/shared/data/src/lib/gql/graphql';
import { getNhostSession } from '@nhost/nextjs';

type ProjectListPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

function ProjectListPage({}: ProjectListPageProps) {
  // useHydrateAtoms([[nhostSessionAtom, nhostSession]]);

  return (
    <>
      <h1>Projects</h1>
      <ProjectList />
    </>
  );
}

type ServersideProps = {
  dehydratedState?: unknown;
};

type Params = {
  projectId: string;
};

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

export const getServerSideProps: GetServerSideProps<
  ServersideProps,
  Params
> = async (context) => {
  // TODO: Get BACKEND_URL from somewhere else…
  const nhostSession = await getNhostSession(BACKEND_URL, context);
  if (!nhostSession) return { props: {} };

  const { client, ssrCache } = getSsrUrqlClient(nhostSession);

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

export default withAuthUrqlClient(ProjectListPage);
