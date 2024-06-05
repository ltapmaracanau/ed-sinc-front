  declare module 'js-cookie' {
    const Cookies: {
      get: (name: string) => string | undefined;
      set: (name: string, value: string, options?: object) => void;
      remove: (name: string) => void;
    };
    export = Cookies;
  }

  declare module 'jwt-decode' {
    export default function jwt_decode<T>(token: string): T;
  }