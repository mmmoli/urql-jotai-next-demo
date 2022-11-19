// import { useAtomValue } from 'jotai';
import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-urql';
import { loadable } from 'jotai/utils';
import { ProjectListDocument } from '../gql/graphql';
import { urqlClientAtom } from '../urql';

// import { loadable, useHydrateAtoms } from 'jotai/utils';

import { atomWithUrlParam } from '../utils/atomWithUrlParam';

const [projectsListAtom] = atomsWithQuery(
  ProjectListDocument,
  () => ({}),
  undefined,
  (get) => get(urqlClientAtom)
);

/* eslint-disable-next-line */
export interface ProjectListProps {}

export const projectIdAtom = atomWithUrlParam({
  key: 'projectId',
});

export function ProjectList(props: ProjectListProps) {
  // useHydrateAtoms([[countAtom, countFromServer]]);
  const result = useAtomValue(loadable(projectsListAtom));

  if (result.state === 'loading') {
    return <div>…</div>;
  }

  if (result.state === 'hasError') {
    return <pre>{JSON.stringify(result.error)}</pre>;
  }

  return (
    <div className="border-2 m-2 p-2">
      <h1>Projects</h1>
      <h2>Project Id</h2>
      <pre>{JSON.stringify(result.data)}</pre>
      {/* {data ? (
        <ul>
          {data.projects.map((project) => {
            return <li key={`project-${project.id}`}>{project.name}</li>;
          })}
        </ul>
      ) : (
        <div>No Data</div>
      )} */}
    </div>
  );
}
