import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { SafeUser } from '@/types/user';

const getAuth = async (): Promise<SafeUser> => {
  console.log('Fetching auth data...');
  const res = await axios.get('/api/auth/user', {
    withCredentials: true,
  });
  return res.data;
}

export const useAuth = () => {
  return useQuery<SafeUser>({
    queryKey: ['auth'],
    queryFn: getAuth,
    refetchOnWindowFocus: false,
    retry: false,
  });
}