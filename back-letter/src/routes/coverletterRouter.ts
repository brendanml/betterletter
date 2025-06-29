import { generateCoverletter, generateApplicantProfileObject } from '../services/coverLetterService';
import ApplicantProfile from '../models/applicantProfileModel';

import { BadRequestError } from '../utils/errors';
import User from '../models/userModel';


import express, { Request, Response } from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

type CoverLetterRequestFields = {
  jobPosting: string;
  userRequests?: string;
};

type CoverLetterResponse = {
  content: string;
  status: string;
};


const saveApplicantProfile = async (
  profileText: string,
  userId: string
) => {
  try {
    // 1. Parse text → object and save profile
    const profileObj = JSON.parse(profileText);
    const profile = await ApplicantProfile.create(profileObj);

    // 2. Link profile _id to the user document
    await User.findByIdAndUpdate(userId, {
      $set: { applicantProfile: profile._id },
    });

    console.log('Applicant profile saved and linked');
    return profile;
  } catch (error) {
    console.error('Error saving Applicant profile:', error);
    throw new BadRequestError('Failed to save Applicant profile');
  }
};




// THIS ROUTE NEEDS TO BE PROTECTED
router.post(
  '/generate',
  upload.single('resume'),
  async (req: Request, res: Response<CoverLetterResponse>) => {
    const { jobPosting, userRequests } = req.body as CoverLetterRequestFields;

    if (!req.file) {
      throw new BadRequestError('Resume file is required');
    }

    if (!jobPosting) {
      throw new BadRequestError('Job posting is required');
    }

    const pdfBuffer = req.file.buffer;
    const parsed = await pdfParse(pdfBuffer);

    if (!parsed.text || !parsed.numpages) {
      throw new BadRequestError('Failed to parse PDF content');
    }


    const ApplicantProfile = await generateApplicantProfileObject(parsed.text);
    console.log('Generated Applicant Profile:', ApplicantProfile);
    console.log(typeof ApplicantProfile);
    const userId = req.user?._id;
    const savedProfile = await saveApplicantProfile(
      ApplicantProfile,          // JSON string
      String(userId)
    );

    // optional: log or use savedProfile if needed
    console.log('Profile ID:', savedProfile._id);


    // You can structure a prompt using parsed.text + jobPosting + userRequests
    const openAiContent = {
      resume: parsed.text,
      jobDescription: jobPosting,
      userRequests: userRequests || '',
    };
    const content = await generateCoverletter(openAiContent);
    if (!content) {
      throw new BadRequestError('Failed to generate cover letter');
    }
    const response: CoverLetterResponse = {
      content,
      status: 'success',
    };
    res.status(200).send(response);
  }
);




export default router;