import { nhostSessionAtom } from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

type ProjectPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ProjectPage({ nhostSession }: ProjectPageProps) {
  useHydrateAtoms([
    [nhostSessionAtom, nhostSession],
    // [projectIdAtom, params.projectId],
  ]);

  return (
    <>
      <h1>Projects</h1>
    </>
  );
}

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

type ServersideProps = {
  nhostSession: NhostSession;
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
    },
  };
};
