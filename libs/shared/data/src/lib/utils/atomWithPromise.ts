import { atomWithReset } from 'jotai/utils';

export function atomWithPromise<T>() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return atomWithReset<T | Promise<T>>(new Promise<T>(() => {}));
}
