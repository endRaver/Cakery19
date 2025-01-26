import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { google } from "@/assets/icons";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"outline"}
      className="h-11 w-full border border-primary-400 bg-white text-black hover:bg-[#f4f4f4]"
    >
      <img src={google} alt="google" className="size-8" />
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButtons;
