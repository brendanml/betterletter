import { useAuthForm } from "@/contexts/AuthFormContext"; // adjust the path to your project

const AuthFormToggle = () => {
  const { formType, setFormType } = useAuthForm();

  return (
    <div className="mt-4 text-center text-sm">
      {formType === "login" ? (
        <>
          Don't have an account?
          <button
            className="ml-2 underline text-primary hover:no-underline"
            onClick={() => setFormType("register")} // or simply toggleFormType()
          >
            Sign up
          </button>
        </>
      ) : (
        <>
          Already have an account?
          <button
            className="ml-2 underline text-primary hover:no-underline"
            onClick={() => setFormType("login")}
          >
            Log in
          </button>
        </>
      )}
    </div>
  );
};

export default AuthFormToggle;
