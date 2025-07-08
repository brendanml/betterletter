// AccountPage.tsx
import { useAuth } from "@/hooks/useAuth";
import AccountUpdateForm from "@/components/forms/AccountUpdateForm";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// import ApplicantProfile from "@/components/ApplicantProfile";

const AccountPage = () => {
  // avoid shadowing the type name; pick something like `user`
  const { data: user , isLoading, isError } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (isError || !user) {
    return (
      <div className="flex flex-col items-center  h-screen mt-10">
        <h1 className="text-2xl font-bold">User not logged in.</h1>
        <Button className="mt-4" onClick={() => navigate("/login")}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start p-4 gap-4">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      <p className="text-lg">Welcome, {user.username}</p>
      <p className="text-lg">Email: {user.email}</p>

      <AccountUpdateForm/>
      {/* <ApplicantProfile /> */}
    </div>
  );
};

export default AccountPage;
