import { Provider as UrqlProvider } from 'urql';
import { FC, ReactNode } from 'react';
import { Provider as JotaiProvider, useAtomValue } from 'jotai';
import { NhostNextProvider } from '@nhost/nextjs';
import { nhost, nhostSessionAtom } from './nhost';
import { urqlClientAtom } from '../urql';

export type ProviderProps = {
  children: ReactNode;
};

export const InnerProvider: FC<ProviderProps> = ({ children }) => {
  const nhostSession = useAtomValue(nhostSessionAtom);
  const urql = useAtomValue(urqlClientAtom);

  return (
    <NhostNextProvider nhost={nhost} initial={nhostSession}>
      {urql ? <UrqlProvider value={urql}>{children}</UrqlProvider> : children}
    </NhostNextProvider>
  );
};

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <JotaiProvider>
      <InnerProvider>{children}</InnerProvider>
    </JotaiProvider>
  );
};
