declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    };
  }
}
