import { DetailView, nhostSessionAtom } from '@mmmoli/shared/data';
import { getNhostSession, NhostSession } from '@nhost/nextjs';

import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

type IndexPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function IndexPage({ nhostSession }: IndexPageProps) {
  useHydrateAtoms([[nhostSessionAtom, nhostSession]]);
  return (
    <>
      <DetailView />
    </>
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
