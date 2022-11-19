import { NhostSession } from '@nhost/nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { ProjectList, ProjectListDocument } from '@mmmoli/shared/data';
import Layout from '../components/layout/layout';
import { SSRData } from 'next-urql';
import { prefetch } from '../helpers/prefetch';

type ProjectListPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ProjectListPage: NextPage<ProjectListPageProps> = () => {
  return (
    <Layout>
      <h1>Projects</h1>
      <ProjectList />
    </Layout>
  );
};

type ServersideProps = {
  urqlState?: SSRData;
  nhostSession?: NhostSession;
};

export const getServerSideProps: GetServerSideProps<ServersideProps> = async (
  context
) => {
  const prefetchResult = await prefetch(context, (client) => [
    client
      .query(ProjectListDocument, undefined)
      .toPromise()
      .catch(console.error),
  ]);

  return prefetchResult;
};

export default ProjectListPage;
