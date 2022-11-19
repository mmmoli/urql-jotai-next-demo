import { Atom, atom } from 'jotai';

export function atomFromAtomValueOrPromise<T>(input: Atom<T>) {
  return atom((get) => {
    const value = get(input);
    if (value) return value;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return new Promise<NonNullable<typeof value>>(() => {});
  });
}
