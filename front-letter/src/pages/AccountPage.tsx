// AccountPage.tsx
import { useAuth } from "@/hooks/useAuth";
// import { useForm } from "react-hook-form"

const AccountPage = () => {
  // avoid shadowing the type name; pick something like `user`
  const { data: user , isLoading, isError } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (isError || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Error: Unable to fetch user data</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Account Page</h1>
      <p className="text-lg">Welcome, {user.username}</p>
      <p className="text-lg">Email: {user.email}</p>
    </div>
  );
};

export default AccountPage;
