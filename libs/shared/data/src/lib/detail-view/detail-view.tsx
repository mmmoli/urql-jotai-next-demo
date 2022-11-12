import { ProjectList } from '../project-list/project-list';

/* eslint-disable-next-line */
export interface DetailViewProps {}

export function DetailView(props: DetailViewProps) {
  return (
    <div>
      <h1>DetailView!</h1>
      <ProjectList />
    </div>
  );
}
