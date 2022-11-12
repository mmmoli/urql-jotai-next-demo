import { nhostSessionAtom, ProjectList } from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { InferGetServerSidePropsType } from 'next';

type ProjectPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProjectPage({
  nhostSession,
  serverRenderParams,
}: ProjectPageProps) {
  useHydrateAtoms([
    [nhostSessionAtom, nhostSession],
    // [projectIdAtom, params.projectId],
  ]);

  return (
    <>
      <pre>{JSON.stringify(serverRenderParams)}</pre>
      <ProjectList />
    </>
  );
}

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

type ServersideProps = {
  nhostSession: NhostSession;
  serverRenderParams: GetServerSidePropsContext['params'];
};

type Params = {
  projectId: string;
};

export const getServerSideProps: GetServerSideProps<
  ServersideProps,
  Params
> = async (context) => {
  const nhostSession = await getNhostSession(BACKEND_URL, context);
  return {
    props: {
      nhostSession,
      serverRenderParams: context.params,
    },
  };
};
