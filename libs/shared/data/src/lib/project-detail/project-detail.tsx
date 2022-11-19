import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-urql';
import { loadable } from 'jotai/utils';
import { FC } from 'react';
import { ProjectDetailDocument } from '../gql/graphql';
import { projectIdPromiseAtom } from '../project-list/project-list';
import { urqlClientAtom } from '../urql';

export const [projectDetailAtom] = atomsWithQuery(
  ProjectDetailDocument,
  (get) => ({
    id: get(projectIdPromiseAtom),
  }),
  undefined,
  (get) => get(urqlClientAtom)
);

export const ProjectDetailView: FC = () => {
  const result = useAtomValue(loadable(projectDetailAtom));

  if (result.state === 'loading') {
    return <div>…</div>;
  }

  if (result.state === 'hasError') {
    return <pre>{JSON.stringify(result.error)}</pre>;
  }

  return (
    <div>
      <h1>Project Detail View</h1>
      <pre>{JSON.stringify(result.data, undefined, 2)}</pre>
    </div>
  );
};
