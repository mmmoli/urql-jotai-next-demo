import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { projectDetailAtom } from './project-detail';

export const Details: FC = () => {
  const { project } = useAtomValue(projectDetailAtom);

  return (
    <div className="prose lg:prose-xl">
      <h1>{project?.name}</h1>
    </div>
  );
};

export default Details;
