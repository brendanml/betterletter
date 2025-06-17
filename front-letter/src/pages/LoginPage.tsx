import Auth from "../components/Auth";
import Notification from "@/components/Notification";



const LoginPage = () => {



  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Notification />
      <Auth />
    </div>
  );
}

export default LoginPage;