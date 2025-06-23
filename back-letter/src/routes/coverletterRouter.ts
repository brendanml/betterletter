import { generateCoverletter } from '../services/coverLetterService';


import express, { Request, Response } from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    const pdfBuffer = req.file.buffer
    const parsed = await pdfParse(pdfBuffer)

    res.json({
      text: parsed.text,
      numPages: parsed.numpages
    })
  } catch (error) {
    console.error('Error parsing PDF:', error)
    res.status(500).json({ error: 'Failed to parse PDF' })
  }
})



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