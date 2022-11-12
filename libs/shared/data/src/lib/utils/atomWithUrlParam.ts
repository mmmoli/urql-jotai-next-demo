import { atomWithReset, RESET } from 'jotai/utils';
import Router, { SingletonRouter } from 'next/router';

type Options = {
  router?: SingletonRouter;
  key: string;
};

export function atomWithUrlParam({ key, router = Router }: Options) {
  const baseAtom = atomWithReset<string | null>(null);
  baseAtom.onMount = (set) => {
    function update() {
      const value = router.query[key] as string | undefined;
      set(value ? value : null);
    }
    router.events.on('routeChangeComplete', update);
    update();
    return () => {
      router.events.off('routeChangeComplete', update);
      set(RESET);
    };
  };
  return baseAtom;
}
