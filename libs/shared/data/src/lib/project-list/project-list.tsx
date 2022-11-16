import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import { ProjectListDocument } from '../gql/graphql';
import { graphQLClient } from '../graphql/client';
import { nhostSessionAtom } from '../provider/provider';
import { atomWithUrlParam } from '../utils/atomWithUrlParam';

type fetchProjectsParams = {
  accessToken: string;
};
export function fetchProjects({ accessToken }: fetchProjectsParams) {
  console.log(accessToken);
  return graphQLClient.request(ProjectListDocument, undefined, {
    Authorization: `Bearer ${accessToken}`,
  });
}

const [, appProjectsAtom] = atomsWithQuery((get) => ({
  queryKey: ['appProjectsAtom'],
  queryFn: () => {
    const session = get(nhostSessionAtom);
    if (!session) return null;
    return fetchProjects({
      accessToken: session.accessToken,
    });
  },
}));

/* eslint-disable-next-line */
export interface ProjectListProps {}

export const projectIdAtom = atomWithUrlParam({
  key: 'projectId',
});

export function ProjectList(props: ProjectListProps) {
  const { isLoading, data, isError, error } = useAtomValue(appProjectsAtom);

  if (isLoading) {
    return <div>…</div>;
  }

  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <div className="border-2 m-2 p-2">
      <h1>Projects</h1>
      <h2>Project Id</h2>
      {data ? (
        <ul>
          {data.projects.map((project) => {
            return <li key={`project-${project.id}`}>{project.name}</li>;
          })}
        </ul>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
