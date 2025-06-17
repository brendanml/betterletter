import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthForm } from "../contexts/AuthFormContext"; // path as appropriate

const AuthFormSwitcher = () => {
  const { formType } = useAuthForm();

  return formType === "login" ? <LoginForm /> : <RegisterForm />;
};

export default AuthFormSwitcher;
