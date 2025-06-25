import { generateCoverletter, generateCandidateProfileObject } from '../services/coverLetterService';
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


const saveCandidateProfile = async (
  profileText: string,
  userId: string
) => {
  try {
    // 1. Parse text → object and save profile
    const profileObj = JSON.parse(profileText);
    const profile = await ApplicantProfile.create(profileObj);

    // 2. Link profile _id to the user document
    await User.findByIdAndUpdate(
      userId,
      { candidateProfile: profile._id },
      { new: true }
    );

    console.log('Candidate profile saved and linked');
    return profile;
  } catch (error) {
    console.error('Error saving candidate profile:', error);
    throw new BadRequestError('Failed to save candidate profile');
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


    const candidateProfile = await generateCandidateProfileObject(parsed.text);
    console.log('Generated Candidate Profile:', candidateProfile);
    console.log(typeof candidateProfile);
    console.log(req.user)
    const savedProfile = await saveCandidateProfile(
      candidateProfile,          // JSON string
      String((req.user as any)._id) // user ID from auth middleware
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