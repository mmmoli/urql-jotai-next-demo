import { useAtomValue } from 'jotai';
import { atomsWithQuery } from 'jotai-urql';
import { loadable } from 'jotai/utils';
import Link from 'next/link';
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

  const project = result.data.project;

  return (
    <div>
      <div className="text-sm breadcrumbs my-3">
        <ul>
          <li>
            <Link href="../">Projects</Link>
          </li>
          <li>{project?.name}</li>
        </ul>
      </div>
      <div className="prose lg:prose-xl">
        <h1>{project?.name}</h1>
      </div>
    </div>
  );
};
