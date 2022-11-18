import { atom, useAtomValue } from 'jotai';
import { atomWithReset, RESET, useUpdateAtom } from 'jotai/utils';
import { useCallback } from 'react';
import { nhostClientAtom, nhostSessionAtom } from '../provider/nhost';

/* eslint-disable-next-line */
export interface AuthProps {}

export const loginAtom = atom(null, async (get, set) => {
  const nhost = get(nhostClientAtom);
  set(authIsLoadingAtom, true);
  await nhost.auth.signIn({
    email: 'michele@htch.app',
    password: process.env['NX_PUBLIC_PASSWORD'] || '',
  });
  const session = await nhost.auth.getSession();
  set(authIsLoadingAtom, RESET);
  set(nhostSessionAtom, session || undefined);
});

export const signoutAtom = atom(null, async (get, set) => {
  const nhost = get(nhostClientAtom);
  set(authIsLoadingAtom, true);
  await nhost.auth.signOut();
  const session = await nhost.auth.getSession();
  set(authIsLoadingAtom, RESET);
  set(nhostSessionAtom, session || undefined);
});

export const userAtom = atom((get) => get(nhostSessionAtom)?.user);

export const authIsLoadingAtom = atomWithReset(false);

export function Auth(props: AuthProps) {
  const login = useUpdateAtom(loginAtom);
  const signout = useUpdateAtom(signoutAtom);
  const user = useAtomValue(userAtom);
  const isLoading = useAtomValue(authIsLoadingAtom);

  const loginHandler = useCallback(login, [login]);
  const signOutHandler = useCallback(signout, [signout]);

  return (
    <div className="flex space-x-2">
      <button onClick={loginHandler}>Login</button>
      <button onClick={signOutHandler}>Out</button>
      {isLoading ? <span>…</span> : <pre>{JSON.stringify(user?.email)}</pre>}
    </div>
  );
}

export default Auth;
