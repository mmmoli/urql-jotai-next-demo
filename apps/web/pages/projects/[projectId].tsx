import {
  ProjectDetailDocument,
  ProjectDetailView,
  projectIdAtom,
} from '@mmmoli/shared/data';
import { NhostSession } from '@nhost/nextjs';
import Layout from '../../components/layout/layout';
import { useHydrateAtoms } from 'jotai/utils';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { prefetch } from '../../helpers/prefetch';

type ProjectDetailPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function ProjectDetailPage({
  projectId,
}: ProjectDetailPageProps) {
  useHydrateAtoms([[projectIdAtom, projectId]]);

  return (
    <Layout>
      <ProjectDetailView />
    </Layout>
  );
}

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
  const prefetchResult = await prefetch(context, (client) => [
    client
      .query(ProjectDetailDocument, { id: context.params.projectId })
      .toPromise()
      .catch(console.error),
  ]);

  return {
    props: {
      ...prefetchResult.props,
      projectId: context.params.projectId,
    },
  };
};
