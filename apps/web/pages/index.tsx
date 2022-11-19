import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { InferGetServerSidePropsType } from 'next';
import {
  ProjectList,
  ProjectListDocument,
  ssrCache,
  urqlClient,
} from '@mmmoli/shared/data';
import Layout from '../components/layout/layout';
import { SSRData } from 'next-urql';

type ProjectListPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ProjectListPage: NextPage<ProjectListPageProps> = ({ nhostSession }) => {
  return (
    <Layout>
      <h1>Projects</h1>
      <pre>{JSON.stringify(nhostSession, undefined, 2)}</pre>
      <ProjectList />
    </Layout>
  );
};

type ServersideProps = {
  dehydratedState?: SSRData;
  nhostSession?: NhostSession;
};

type Params = {
  projectId: string;
};

const BACKEND_URL = 'https://nxlppvxwouvddpyfntil.nhost.run/';

export const getServerSideProps: GetServerSideProps<
  ServersideProps,
  Params
> = async (context) => {
  const nhostSession = await getNhostSession(BACKEND_URL, context);

  // await urqlClient
  //   .query(ProjectListDocument, undefined)
  //   .toPromise()
  //   .catch(console.log);

  return {
    props: {
      nhostSession,
      // dehydratedState: ssrCache.extractData(),
    },
  };
};

export default ProjectListPage;
