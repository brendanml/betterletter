import axios from 'axios';
import type { NewUser, LoginUser } from '../schemas/userSchema';

export const createUser = async (user: NewUser) => {
  const res = await axios.post('/api/auth/register', user);
  return res.data;
}

export const loginUser = async (user: LoginUser) => {
  const res = await axios.post('/api/auth/login', user);
  return res.data;
}

export const logoutUser = async () => {
  const res = await axios.get('/api/auth/logout');
  return res.data;
}

export const getApplicantProfile = async () => {
  const res = await axios.get("/api/user/profile")
  return res.data
}