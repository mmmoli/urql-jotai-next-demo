import {
  fetchProjects,
  nhostSessionAtom,
  ProjectList,
} from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/query-core';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

type ProjectPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProjectPage({ nhostSession }: ProjectPageProps) {
  useHydrateAtoms([[nhostSessionAtom, nhostSession]]);

  return (
    <>
      <h1>Projects</h1>
      <ProjectList />
    </>
  );
}

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

type ServersideProps = {
  nhostSession: NhostSession;
  dehydratedState: DehydratedState;
};

type Params = {
  projectId: string;
};

export const getServerSideProps: GetServerSideProps<
  ServersideProps,
  Params
> = async (context) => {
  const nhostSession = await getNhostSession(BACKEND_URL, context);
  const queryClient = new QueryClient();

  if (nhostSession) {
    // await queryClient.prefetchQuery(['appProjectsAtom'], () =>
    //   fetchProjects({
    //     accessToken: nhostSession.accessToken,
    //   })
    // );
  }

  return {
    props: {
      nhostSession,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
