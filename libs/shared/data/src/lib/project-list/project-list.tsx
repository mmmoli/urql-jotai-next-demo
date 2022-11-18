import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-urql';
import { loadable } from 'jotai/utils';
import {
  ProjectListDocument,
  ProjectListQuery,
  ProjectListQueryVariables,
} from '../gql/graphql';
import { atomWithUrlParam } from '../utils/atomWithUrlParam';

const [, projectsListAtom] = atomsWithQuery<
  ProjectListQuery,
  ProjectListQueryVariables
>(
  ProjectListDocument,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => ({}),
  undefined // context
);

/* eslint-disable-next-line */
export interface ProjectListProps {}

export const projectIdAtom = atomWithUrlParam({
  key: 'projectId',
});

export function ProjectList(props: ProjectListProps) {
  const result = useAtomValue(loadable(projectsListAtom));

  if (result.state === 'loading') {
    return <div>…</div>;
  }

  if (result.state === 'hasError') {
    return <pre>{JSON.stringify(result.error)}</pre>;
  }

  const data = result.data.data;

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
