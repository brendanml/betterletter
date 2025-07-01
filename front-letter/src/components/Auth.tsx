// src/pages/Auth.tsx
import AuthForm from "@/components/AuthForm";       // reads formType from context
import AuthFormToggle from "@/components/AuthFormToggle";           // now uses useAuthForm inside
import { AuthFormProvider } from "@/contexts/AuthFormContext";      // the new provider
import { Button } from "@/components/ui/button";
import googleLogo from "@/assets/google_logo.svg";

const Auth = () => {
  const handleGoogleLogin = () => {
    window.open("/api/auth/google", "_self");
  };

  return (
    <AuthFormProvider initialFormType="login">
      <div className="space-y-8 shadow-md p-6 w-full max-w-md mx-auto bg-[var(--background)] rounded-md">
        <h1 className="text-2xl font-bold text-center mb-2">Better Letter</h1>
        <p className="text-center">Please log in to your account</p>

        {/* renders <LoginForm /> or <RegisterForm /> based on context */}
        <AuthForm />

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button onClick={handleGoogleLogin} className="btn-signin flex items-center justify-center gap-2">
          <img src={googleLogo} alt="Google logo" className="w-6" />
          Continue with Google
        </Button>

        {/* toggles the form via context */}
        <AuthFormToggle />
      </div>
    </AuthFormProvider>
  );
};

export default Auth;
