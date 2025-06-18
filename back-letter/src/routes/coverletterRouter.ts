import express from 'express';

import { generateCoverletter } from '../services/coverLetterService';
const router = express.Router();


router.post('/generate', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const coverLetter = await generateCoverletter(prompt);
    res.status(200).json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    res.status(500).json({ error: 'Failed to generate cover letter' });
  }
});


export default router;