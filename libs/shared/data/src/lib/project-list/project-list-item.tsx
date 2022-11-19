import { atomsWithQuery } from 'jotai-urql';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { ProjectDetailDocument } from '../gql/graphql';
import { urqlClientAtom } from '../urql';
import { projectIdAtom } from './project-list';

export type ProjectListItemProps = {
  id: string;
  name: ReactNode;
};

export const [projectDetailAtom] = atomsWithQuery(
  ProjectDetailDocument,
  (get) => ({
    id: get(projectIdAtom),
  }),
  undefined,
  (get) => get(urqlClientAtom)
);

export const ProjectListItem: FC<ProjectListItemProps> = ({ id, name }) => {
  return (
    <Link
      href={{
        pathname: '/projects/[projectId]',
        query: { projectId: id },
      }}
    >
      {name}
    </Link>
  );
};
