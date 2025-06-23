import express from 'express';
import { sessionMiddleware, logger, errorHandler } from './middleware/middleware';

import { connectRedis } from './utils/redis';
import { connectDb } from './utils/db';

import passport from 'passport';

import userRouter from './routes/authRouter';

import coverletterRouter from './routes/coverletterRouter';

import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

app.use(sessionMiddleware)
app.use(passport.initialize());
app.use(passport.session());


//

(async () => {
  await connectDb();
})();

(async () => {
  await connectRedis();
})();

// MIDDLEWARE STACK

app.use(sessionMiddleware);
app.use(logger);

// ROUTES

app.use('/api/auth', userRouter);

app.use('/api/cover-letter', coverletterRouter);

// ERROR HANDLING
app.use(errorHandler);
// START SERVER
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});