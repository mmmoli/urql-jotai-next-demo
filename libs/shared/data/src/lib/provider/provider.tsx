import { FC, ReactNode } from 'react';
import { atom, Provider as JotaiProvider, useAtomValue } from 'jotai';
import { NhostNextProvider, NhostClient, NhostSession } from '@nhost/nextjs';

export const nhost = new NhostClient({
  subdomain: process.env['NX_PUBLIC_NHOST_SUBDOMAIN'] || '',
  region: process.env['NX_PUBLIC_NHOST_REGION'] || '',
});

export type ProviderProps = {
  children: ReactNode;
};

export const nhostClientAtom = atom(() => nhost);
export const nhostSessionAtom = atom<NhostSession | undefined>(undefined);

export const InnerProvider: FC<ProviderProps> = ({ children }) => {
  const nhostSession = useAtomValue(nhostSessionAtom);
  return (
    <NhostNextProvider nhost={nhost} initial={nhostSession}>
      {children}
    </NhostNextProvider>
  );
};

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <>
      provider
      <JotaiProvider>
        <InnerProvider>{children}</InnerProvider>
      </JotaiProvider>
    </>
  );
};
