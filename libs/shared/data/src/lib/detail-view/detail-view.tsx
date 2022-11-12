import { SharedData } from '../shared-data/shared-data';

/* eslint-disable-next-line */
export interface DetailViewProps {}

export function DetailView(props: DetailViewProps) {
  return (
    <div>
      <h1>Welcome to DetailView!</h1>
      <SharedData />
    </div>
  );
}
