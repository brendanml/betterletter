import { useQuery } from '@tanstack/react-query';
import { getApplicantProfile } from '@/services/userService';

export const useApplicantProfile = () =>
  useQuery({
    queryKey: ['applicantProfile'],
    queryFn: getApplicantProfile,
    staleTime: 5 * 60 * 1000,  // 5 min fresh
    retry: 1                   // retry once on network error
  });