import { CombinedError, errorExchange, Operation } from 'urql';

export const HTCHErrorExchange = errorExchange({
  onError: (error: CombinedError, operation: Operation) => {
    console.log('An error!', error);
  },
});
