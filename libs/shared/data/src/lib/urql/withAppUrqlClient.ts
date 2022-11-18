import { withUrqlClient } from 'next-urql';
import { getUrqlClientOptions } from './clientOptions';

export const withAuthUrqlClient = withUrqlClient(
  getUrqlClientOptions({ withAuth: true }),
  {
    ssr: false,
  }
);

export const withNoAuthUrqlClient = withUrqlClient(
  getUrqlClientOptions({ withAuth: false }),
  {
    ssr: false,
  }
);
