import { NhostClient, NhostSession } from '@nhost/nextjs';
import { atom } from 'jotai';

export const nhost = new NhostClient({
  subdomain: process.env['NX_PUBLIC_NHOST_SUBDOMAIN'] || '',
  region: process.env['NX_PUBLIC_NHOST_REGION'] || '',
});

export const nhostClientAtom = atom(() => nhost);
export const nhostSessionAtom = atom<NhostSession | undefined>(undefined);
