import 'express-session';
import { Document, Types } from 'mongoose';   // if you store Mongo IDs
import { UserDoc } from '../models/userModel';

declare module 'express-session' {

  // for req.session.user
  interface SessionData {
    user?: {
      username: string;
      email: string;
    };
  }

}


//  for passport req.user to not throw error
declare global {
  namespace Express {
    interface User extends UserDoc { }
  }
}
