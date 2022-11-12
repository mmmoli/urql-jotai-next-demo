// import { atom, useAtomValue } from 'jotai';
import { atomWithLocation } from 'jotai-location';
// import { atomWithPromise } from '../utils/atomWithPromise';
// import { isSSR } from '../utils/isSSR';

import { atom, useAtomValue } from 'jotai';
import { atomWithHash } from 'jotai/utils';
import { isSSR } from '../utils/isSSR';
import Router from 'next/router';

// /* eslint-disable-next-line */
// export interface SharedDataProps {}

// export const nextRouterAtom = atomWithPromise<NextRouter>();

// export const locationAtom = atom((get) => {
//   console.log('getting');
//   if (isSSR) {
//     console.log('SSR');
//     return '/';
//   } else {
//     console.log('client');
//     return '/';
//   }
// });

const locationAtom = atomWithLocation<typeof Router>({
  getLocation: () => Router,
  applyLocation: (location) => {
    debugger;
  },
  subscribe: (callback: () => void) => {
    Router.events.on('routeChangeComplete', callback);
    window.addEventListener('hashchange', callback);
    return () => {
      Router.events.off('routeChangeComplete', callback);
      window.removeEventListener('hashchange', callback);
    };
  },
});

const pageAtom = atomWithHash('page', 1, {
  replaceState: true,
  subscribe: (callback) => {
    Router.events.on('routeChangeComplete', callback);
    window.addEventListener('hashchange', callback);
    return () => {
      Router.events.off('routeChangeComplete', callback);
      window.removeEventListener('hashchange', callback);
    };
  },
});

// type AtomWithThingOptions = {
//   key: string;
//   defaultValue: string;
// };

// function atomWithThing({ key, defaultValue }: AtomWithThingOptions) {
//   const pageAtom = atomWithHash(key, defaultValue, {
//     replaceState: true,
//     subscribe: (callback) => {
//       Router.events.on('routeChangeComplete', callback);
//       window.addEventListener('hashchange', callback);
//       return () => {
//         Router.events.off('routeChangeComplete', callback);
//         window.removeEventListener('hashchange', callback);
//       };
//     },
//   });

//   return pageAtom;
// }

export function SharedData() {
  // const router = useRouter();
  // useHydrateAtoms([[nextRouterAtom, router]]);

  return (
    <div>
      <h1>Welcome to SharedData!</h1>
    </div>
  );
}
