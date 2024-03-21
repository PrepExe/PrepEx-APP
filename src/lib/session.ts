import { IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: 'SESSION',
  cookieOptions: {
    maxAge: 86400 * 7,
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user: {
      name: string;
      email: string;
    }
  }
}