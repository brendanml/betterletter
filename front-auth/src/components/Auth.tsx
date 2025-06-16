import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import AuthFormToggle from '../components/AuthFormToggle';
import type { AuthFormType } from '../types/auth';
import { Button } from '@/components/ui/button';
import googleLogo from '@/assets/google_logo.svg';

const Auth = () => {
  const [formType, setFormType] = useState<AuthFormType>('login');

  const handleGoogleLogin = () => {
    const googleAuthUrl = "/api/auth/google";
    window.open(googleAuthUrl, "_self");
  }

  return (
    <div className="space-y-8 shadow-md p-6 w-full max-w-md mx-auto rounded-lg bg-[var(--color-secondary-background)]">
      <Button className='flex flex-row bg-black rounded-full w-fit p-2 px-8 items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-300 mx-auto' onClick={handleGoogleLogin}>
        <img src={googleLogo} alt="google logo" className='w-6'/>
        <span className='text-white text-lg'>Google</span>

      </Button>
      <AuthForm formType={formType} />
      <AuthFormToggle formType={formType} setFormType={setFormType} />
    </div>
  );
};

export default Auth;