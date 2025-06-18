import axios from 'axios';

export const generateCoverLetter = async (prompt: string) => {
  const res = await axios.post('/api/cover-letter/generate', { prompt });
  return res.data;
}