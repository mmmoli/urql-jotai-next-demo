import { useAtomValue } from 'jotai';
import { atomWithUrlParam } from '../utils/atomWithUrlParam';

/* eslint-disable-next-line */
export interface ProjectListProps {}

export const projectIdAtom = atomWithUrlParam({
  key: 'projectId',
});

export function ProjectList(props: ProjectListProps) {
  const projectId = useAtomValue(projectIdAtom);
  return (
    <div className="border-2 m-2 p-2">
      <h1>Projects</h1>
      <h2>Project Id</h2>
      <pre>{JSON.stringify(projectId)}</pre>
    </div>
  );
}
