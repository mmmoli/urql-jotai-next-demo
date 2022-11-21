import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { FC } from 'react';
import { projectDetailAtom } from './project-detail';

export const Breadcrumb: FC = () => {
  const { project } = useAtomValue(projectDetailAtom);
  console.log(project);

  return (
    <div className="text-sm breadcrumbs my-3">
      <ul>
        <li>
          <Link href="../">Projects</Link>
        </li>
        <li>{project?.name}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
