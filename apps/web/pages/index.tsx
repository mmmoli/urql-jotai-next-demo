import { getNhostSession, NhostSession } from '@nhost/nextjs';
import { GetServerSideProps, NextPage } from 'next';
import { InferGetServerSidePropsType } from 'next';
import {
  getSSRClient,
  ProjectList,
  ProjectListDocument,
  ssrCache,
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
      <ProjectList />
      <pre>{JSON.stringify(nhostSession, undefined, 2)}</pre>
    </Layout>
  );
};

type ServersideProps = {
  urqlState?: SSRData;
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

  if (nhostSession) {
    const urqlClient = getSSRClient(nhostSession);
    await urqlClient
      .query(ProjectListDocument, undefined)
      .toPromise()
      .catch(console.error);
  }

  return {
    props: {
      nhostSession,
      urqlState: ssrCache.extractData(),
    },
  };
};

export default ProjectListPage;
