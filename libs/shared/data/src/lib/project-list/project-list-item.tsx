import Link from 'next/link';
import { FC, ReactNode } from 'react';

export type ProjectListItemProps = {
  id: string;
  name: ReactNode;
};

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
