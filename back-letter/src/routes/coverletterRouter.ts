import { generateCoverletter } from '../services/coverLetterService';

import { BadRequestError } from '../utils/errors';


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




// router.post('/generate', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;
//     const coverLetter = await generateCoverletter(prompt);
//     res.status(200).json({ coverLetter });
//   } catch (error) {
//     console.error('Error generating cover letter:', error);
//     res.status(500).json({ error: 'Failed to generate cover letter' });
//   }
// });


export default router;