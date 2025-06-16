import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { UnauthorizedError } from '../utils/errors';
import { NewUser, SafeUser, LoginUser, UserData } from '../schemas/userSchema';
import { newUserParser, loginUserParser, checkAuthentication } from '../middleware/middleware';
import { createUser } from '../services/userService';
import passport from 'passport';


require('../services/passport');

const router = express.Router();

router.get('/user', checkAuthentication, (req: Request, res: Response<SafeUser>) => {
  // Check if user is logged in
  // if (!req.session.user) {
  //   throw new UnauthorizedError('User not logged in');
  // }

  const user = req.user as { username: string; email: string };


  // using passport so no req.session.user its req.user

  if (!user || !user.username || !user.email) {
    throw new UnauthorizedError('User not logged in');
  }
  // If logged in, return user data
  // const safeUser: SafeUser = {
  //   email: req.user.email,
  // };
  const safeUser: SafeUser = {
    username: user.username,
    email: user.email,
  };
  res.status(200).json(safeUser);
});


router.post('/register', newUserParser, async (req: Request<unknown, unknown, NewUser>, res: Response<SafeUser>, next: NextFunction) => {
  const newUserData: NewUser = req.body; // Destructure to get user data

  try {
    const newUser: UserData = await createUser(newUserData);
    const safeUser: SafeUser = {
      username: newUser.username,
      email: newUser.email,
    };
    res.status(201).json(safeUser); // Respond with the created user
  } catch (error) {
    next(error)
  }
}
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Clear user from session
    req.session.user = undefined;
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

router.post('/login', loginUserParser, (req: Request<unknown, unknown, LoginUser>, res: Response<SafeUser>, next: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: any, _info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      next(new UnauthorizedError('Invalid email or password'));
    }
    console.log('User found:', user);
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      console.log('HEREEEE logged in:', user);
      const safeUser: SafeUser = {
        username: user.username,
        email: user.email,
      };
      req.session.user = safeUser;
      res.status(200).json(safeUser);
    });
  })(req, res, next);
});

// permissions requested by user
router.get('/google/callback', (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  return passport.authenticate('google', (err: any, user: Express.User | false) => {
    if (err) {
      console.error("Passport Callback Error:", err);
      return res.status(500).json({ message: "OAuth error", error: err });
    }

    if (!user) {
      console.warn("No user returned from passport");
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.logIn(user, (loginErr: any) => {
      if (loginErr) {
        console.error("Login Error:", loginErr);
        return res.status(500).json({ message: "Login failed", error: loginErr });
      }

      return res.redirect('http://localhost:5173'); // Redirect to your frontend application
    });
  })(req, res, next);
});
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// const loginData: LoginUser = req.body; // Destructure to get login data

// try { 
//   const user: UserData = await loginUser(loginData);
//   const safeUser: SafeUser = {
//     username: user.username,
//     email: user.email,
//   };
//   req.session.user = user; // Store user in session
//   res.status(200).json(safeUser); // Respond with the logged-in user
// } catch (error) {
//   next(error);
// }

export default router;