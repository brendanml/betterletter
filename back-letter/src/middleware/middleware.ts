// FOR:
// sessionMiddleware.ts
import dotenv from 'dotenv';
dotenv.config();
import { newUserSchema, loginUserSchema } from "../schemas/userSchema";
import { Request, Response, NextFunction } from 'express';

///////

// userParser.ts



export const newUserParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newUserSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}

// loginUserParser.ts

export const loginUserParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    loginUserSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
}


// sessionMiddleware.ts
import session from 'express-session';
import { redisStore } from '../utils/redis';


if (!process.env.REDIS_SECRET) {
  throw new Error("REDIS_SECRET is not defined");
}


export const sessionMiddleware = session({
  store: redisStore,
  secret: process.env.REDIS_SECRET,   // ≥ 32 random bytes in prod
  resave: false,                // don’t write if session didn’t change
  saveUninitialized: false,     // don’t create empty sessions
  cookie: {
    secure: process.env.NODE_ENV === "production", // set true behind HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60      // 1 h cookie life
  }
})

// logger.ts

export const logger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`\n===== Incoming Request =====`);
  console.log('► time:', new Date().toISOString());
  console.log(`► ${req.method} ${req.originalUrl}`);
  console.log('► session ID:', req.sessionID);
  console.dir(req.session, { depth: null });

  if (req.method !== 'GET') {
    console.log('► body:', req.body);
  }

  if (Object.keys(req.query).length > 0) {
    console.log('► query:', req.query);
  }

  console.log('=============================\n');
  next();
}

// errorHandler.ts

import { ErrorRequestHandler } from 'express';
import { AppError, DuplicateUserError } from '../utils/errors';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof DuplicateUserError) {
    console.log(err.message)
    res.status(err.statusCode).send(err.message);
    return;
  }
  if (err instanceof AppError) {
    console.error('AppError:', err);
    res.status(err.statusCode).json({ error: err.message });
    return
  }


  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
  return;
};



// isAuthenticated.ts

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ "msg": "Unauthorized" });
}


