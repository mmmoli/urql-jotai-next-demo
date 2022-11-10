import { SharedData } from '@mmmoli/shared/data';
import { NextPage } from 'next';

export const IndexPage: NextPage = () => {
  return (
    <div className="font-mono">
      <SharedData />
    </div>
  );
};

export default IndexPage;
