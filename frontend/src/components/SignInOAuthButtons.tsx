import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  const signInWithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"outline"}
      className="h-10 w-full cursor-pointer"
    >
      <img src="/google.png" alt="google icon" className="size-7" /> Continue
      with Google
    </Button>
  );
};

export default SignInOAuthButtons;
