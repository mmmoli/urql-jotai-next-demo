import { getSSRClient, projectIdAtom, ssrCache } from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import Layout from '../../components/layout/layout';
import { useHydrateAtoms } from 'jotai/utils';

import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

type ProjectDetailPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function ProjectDetailPage({
  projectId,
}: ProjectDetailPageProps) {
  useHydrateAtoms([[projectIdAtom, projectId]]);

  return (
    <Layout>
      <h1>Project Detail</h1>
      <pre>{JSON.stringify(projectId)}</pre>
    </Layout>
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
    const urqlClient = getSSRClient(nhostSession);
    Promise.all([]);
  }

  return {
    props: {
      nhostSession,
      urqlState: ssrCache.extractData(),
      projectId: context.params.projectId,
    },
  };
};
