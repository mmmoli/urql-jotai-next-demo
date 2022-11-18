// import { useAtomValue } from 'jotai';
import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-urql';
import { loadable } from 'jotai/utils';
import { ProjectListDocument } from '../gql/graphql';
import { nhostSessionAtom } from '../provider/nhost';
import { getBrowserUrqlClient } from '../urql';
// import { loadable, useHydrateAtoms } from 'jotai/utils';

import { atomWithUrlParam } from '../utils/atomWithUrlParam';

const { client } = getBrowserUrqlClient();

const [projectsListAtom] = atomsWithQuery(
  ProjectListDocument,
  () => ({}),
  undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => {
    return client;
  }
);

/* eslint-disable-next-line */
export interface ProjectListProps {}

export const projectIdAtom = atomWithUrlParam({
  key: 'projectId',
});

export function ProjectList(props: ProjectListProps) {
  const session = useAtomValue(nhostSessionAtom);
  // useHydrateAtoms([[countAtom, countFromServer]]);
  // const result = useAtomValue(loadable(projectsListAtom));

  // if (result.state === 'loading') {
  //   return <div>…</div>;
  // }

  // if (result.state === 'hasError') {
  //   return <pre>{JSON.stringify(result.error)}</pre>;
  // }

  return (
    <div className="border-2 m-2 p-2">
      <h1>Projects</h1>
      <h2>Project Id</h2>
      <pre>{JSON.stringify(session, undefined, 2)}</pre>
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
