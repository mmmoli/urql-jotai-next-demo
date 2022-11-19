// import { useAtomValue } from 'jotai';
import { atom, useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-urql';
import { loadable } from 'jotai/utils';
import { ProjectListDocument } from '../gql/graphql';
import { urqlClientAtom } from '../urql';
import { atomFromAtomValueOrPromise } from '../utils/atomFromAtomOrPromise';
import { atomWithPromise } from '../utils/atomWithPromise';

// import { loadable, useHydrateAtoms } from 'jotai/utils';

import { atomWithUrlParam } from '../utils/atomWithUrlParam';
import { ProjectListItem } from './project-list-item';

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

export const projectIdPromiseAtom = atomFromAtomValueOrPromise(projectIdAtom);

export function ProjectList(props: ProjectListProps) {
  // useHydrateAtoms([[countAtom, countFromServer]]);
  const result = useAtomValue(loadable(projectsListAtom));

  if (result.state === 'loading') {
    return <div>…</div>;
  }

  if (result.state === 'hasError') {
    return <pre>{JSON.stringify(result.error)}</pre>;
  }

  const data = result.data;

  return (
    <div className="border-2 m-2 p-2">
      <h1>Projects</h1>
      {data ? (
        <ul>
          {data.projects.map((project) => {
            return (
              <li key={`project-${project.id}`}>
                <ProjectListItem {...project} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}
