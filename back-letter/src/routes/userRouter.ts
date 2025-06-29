import express, { Request } from 'express';
const router = express.Router();
import User from '../models/userModel';
import { UnauthorizedError } from '../utils/errors';
import { checkAuthentication } from '../middleware/middleware';


router.get(
  '/profile',
  checkAuthentication,
  async (req: Request, res: any) => {
    const userId = req.user?._id;          // assumes req.user is populated

    if (!userId) {
      throw new UnauthorizedError('User not logged in');
    }
    console.log('User ID:', userId); // Debugging line to check userId

    // change the query if your schema stores userId differently
    const foundUser = await User.findById(userId).populate('applicantProfile').exec();
    if (!foundUser) {
      throw new UnauthorizedError('User not found');
    }
    console.log('Found User:', foundUser); // Debugging line to check foundUser
    console.log('Applicant Profile:', foundUser.applicantProfile); // Debugging line to check profile

    // if (!userProfile) {
    //   res.status(404).json(null);   // early return  ←★
    // }

    res.status(200).json(foundUser.applicantProfile);     // only reached when profile exists
  }
);


export default router;