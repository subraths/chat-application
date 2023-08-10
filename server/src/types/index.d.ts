export {};

interface SessionData {
  token: string;
  refresh: string;
}

declare global {
  namespace Express {
    interface Request {
      session: SessionData;
      user: string;
    }
  }
}
