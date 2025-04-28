import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button";
import { google } from "@/assets/icons";
import { useUserStore } from "@/stores/useUserStore";

const SignInOAuthButtons = () => {
  const { handleGoogleLogin } = useUserStore();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      await handleGoogleLogin(response.access_token);
      window.location.reload();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return (
    <Button
      onClick={() => googleLogin()}
      variant={"outline"}
      className="h-11 w-full border border-primary-400 bg-white text-black hover:bg-[#f4f4f4]"
    >
      <img src={google} alt="google" className="size-8" />
      <span className="text-sm">Continue with Google</span>
    </Button>
  );
};

export default SignInOAuthButtons;
