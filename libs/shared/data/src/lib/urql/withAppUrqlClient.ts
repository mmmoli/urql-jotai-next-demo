import { getUrqlClientOptions } from './getUrqlClientOptions';
import { withUrqlClient } from 'next-urql';

export const withAuthUrqlClient = withUrqlClient(
  getUrqlClientOptions({ withAuth: true }),
  {
    ssr: false,
  }
);
