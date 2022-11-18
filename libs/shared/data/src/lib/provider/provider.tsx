import { FC, ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { NhostNextProvider, NhostSession } from '@nhost/nextjs';
import { nhost } from './nhost';

export type ProviderProps = {
  children: ReactNode;
  nhostSession?: NhostSession;
};

export const Provider: FC<ProviderProps> = ({ children, nhostSession }) => {
  return (
    <JotaiProvider>
      <NhostNextProvider nhost={nhost} initial={nhostSession}>
        {children}
      </NhostNextProvider>
    </JotaiProvider>
  );
};
