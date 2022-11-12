import { nhostSessionAtom } from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { SharedData } from '@mmmoli/shared/data';

type AboutPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function AboutPage({ nhostSession }: AboutPageProps) {
  useHydrateAtoms([[nhostSessionAtom, nhostSession]]);
  return (
    <div className="font-mono">
      <h1>About</h1>
      <p>GO@!!</p>
      <SharedData />
    </div>
  );
}

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

type ServersideProps = {
  nhostSession: NhostSession;
};

export const getServerSideProps: GetServerSideProps<ServersideProps> = async (
  context
) => {
  const nhostSession = await getNhostSession(BACKEND_URL, context);

  return {
    props: {
      nhostSession,
    },
  };
};
