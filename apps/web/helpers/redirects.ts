type RedirectRule =
  | {
      redirect: {
        destination: string;
      };
    }
  | undefined;

export class redirectBuilder {
  private readonly _redirect?: RedirectRule;

  constructor(redirectUrl: string) {
    this._redirect = {
      redirect: {
        destination: redirectUrl,
      },
    };
  }

  build(): RedirectRule | null {
    return this._redirect;
  }
}

export const DisallowBuilder = () => {};

export const DisallowExceptUserRole = ({ redirectUrl = '/auth' }) => {
  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  };
};

export const DisallowExceptAnonymousRole = ({ redirectUrl = '/auth' }) => {
  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  };
};
