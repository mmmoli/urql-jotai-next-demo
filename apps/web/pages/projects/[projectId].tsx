import {
  graphQLClient,
  nhostSessionAtom,
  projectIdAtom,
  ProjectList,
  queryClient,
} from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { useHydrateAtoms } from 'jotai/utils';
import { ProjectListDocument } from 'libs/shared/data/src/lib/gql/graphql';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

type ProjectDetailPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function ProjectDetailPage({
  nhostSession,
  projectId,
}: ProjectDetailPageProps) {
  useHydrateAtoms([[nhostSessionAtom, nhostSession]]);
  useHydrateAtoms([[projectIdAtom, projectId]]);

  return (
    <>
      <h1>Project Detail</h1>
      <pre>{JSON.stringify(projectIdAtom)}</pre>
    </>
  );
}

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

type ServersideProps = {
  nhostSession: NhostSession;
  projectId: string;
};

type Params = {
  projectId: string;
};

export const getServerSideProps: GetServerSideProps<
  ServersideProps,
  Params
> = async (context) => {
  const nhostSession = await getNhostSession(BACKEND_URL, context);
  if (nhostSession) {
    await Promise.all([
      queryClient.prefetchQuery(['appProjectsAtom'], () =>
        graphQLClient.request(ProjectListDocument, undefined, {
          Authorization: `Bearer ${nhostSession.accessToken}`,
        })
      ),
      queryClient.prefetchQuery(['appProjectsAtom'], () =>
        graphQLClient.request(ProjectListDocument, undefined, {
          Authorization: `Bearer ${nhostSession.accessToken}`,
        })
      ),
    ]);
  }

  return {
    props: {
      nhostSession,
      projectId: context.params.projectId,
    },
  };
};
