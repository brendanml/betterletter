import Auth from "../components/Auth";
import Notification from "@/components/Notification";



const LoginPage = () => {



  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
        <Notification />
      <article className="min-w-[300px] max-w-[500px] w-full p-6">
        <Auth />
      </article>
    </div>
  );
}

export default LoginPage;