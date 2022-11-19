import {
  getSSRClient,
  projectDetailAtom,
  ProjectDetailDocument,
  ProjectDetailView,
  projectIdAtom,
  projectIdPromiseAtom,
  ssrCache,
} from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import Layout from '../../components/layout/layout';
import { loadable, useAtomValue, useHydrateAtoms } from 'jotai/utils';

import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

type ProjectDetailPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function ProjectDetailPage({
  projectId,
}: ProjectDetailPageProps) {
  useHydrateAtoms([[projectIdAtom, projectId]]);
  // const result = useAtomValue(loadable(projectDetailAtom));

  // if (result.state === 'loading') {
  //   return <div>…</div>;
  // }

  // if (result.state === 'hasError') {
  //   return <pre>{JSON.stringify(result.error)}</pre>;
  // }

  // const data = result.data.project;

  return (
    <Layout>
      <ProjectDetailView />
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
    await Promise.all([
      urqlClient
        .query(ProjectDetailDocument, { id: context.params.projectId })
        .toPromise()
        .catch(console.error),
    ]);
  }

  return {
    props: {
      nhostSession,
      urqlState: ssrCache.extractData(),
      projectId: context.params.projectId,
    },
  };
};
