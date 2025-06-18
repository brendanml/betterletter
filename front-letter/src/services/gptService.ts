import axios from 'axios';

export const promptOpenai = async (prompt: string) => {
  const res = await axios.post('/api/openai', { prompt });
  return res.data;
}