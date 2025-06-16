import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import type { AuthFormType } from '../types/auth';

interface Props {
  formType: AuthFormType;
}

const AuthFormSwitcher = ({ formType }: Props) => {
  switch (formType) {
    case 'login':
      return <LoginForm />;
    case 'register':
      return <RegisterForm />;
    default:
      return null;
  }
};

export default AuthFormSwitcher;
