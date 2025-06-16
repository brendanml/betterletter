import type { AuthFormType } from '../types/auth';

interface AuthFormChangerProps {
  formType: AuthFormType;
  setFormType: (type: AuthFormType) => void;
}

const AuthFormChanger = ({ formType, setFormType }: AuthFormChangerProps) => {
  return (
    <div className="text-center text-sm mt-4">
      {formType === 'login' ? (
        <>
          Don't have an account?
          <button className="ml-2 text-blue-500 underline" onClick={() => setFormType('register')}>
            Sign up
          </button>
        </>
      ) : (
        <>
          Already have an account?
          <button className="ml-2 text-blue-500 underline" onClick={() => setFormType('login')}>
            Log in
          </button>
        </>
      )}
    </div>
  );
};

export default AuthFormChanger;
