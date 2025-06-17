import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Auth {
  username: string;
  email: string;
}

const getAuth = async (): Promise<Auth> => {
  console.log('Fetching auth data...');
  const res = await axios.get('/api/auth/user', {
    withCredentials: true,
  });
  return res.data;
}

export const useAuth = () => {
  return useQuery<Auth>({
    queryKey: ['auth'],
    queryFn: getAuth,
    refetchOnWindowFocus: false,
    retry: false,
  });
}