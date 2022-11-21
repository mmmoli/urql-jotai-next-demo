import { atomsWithQuery } from 'jotai-urql';
import dynamic from 'next/dynamic';
import { FC, Suspense } from 'react';
import { ProjectDetailDocument } from '../gql/graphql';
import { projectIdPromiseAtom } from '../project-list/project-list';
import { urqlClientAtom } from '../urql';

const DynamicBreadcrumb = dynamic(() => import('./breadcrumb'), {
  suspense: true,
});

const DynamicDetails = dynamic(() => import('./details'), {
  suspense: true,
});

export const [projectDetailAtom] = atomsWithQuery(
  ProjectDetailDocument,
  (get) => ({
    id: get(projectIdPromiseAtom),
  }),
  undefined,
  (get) => get(urqlClientAtom)
);

export const ProjectDetailView: FC = () => {
  return (
    <div>
      <Suspense fallback={<>…</>}>
        <DynamicBreadcrumb />
      </Suspense>
      <Suspense fallback={<>…</>}>
        <DynamicDetails />
      </Suspense>

      <div className="absolute bottom-4">
        <div className="btn-group grid grid-cols-2">
          <button className="btn btn-outline">Previous page</button>
          <button className="btn btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
};
