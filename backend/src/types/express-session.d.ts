import 'express-session';

declare module 'express-session' {
  interface Session {
    userId?: number;  // or the actual type of your userId
  }
}