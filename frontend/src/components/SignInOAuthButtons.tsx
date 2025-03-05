import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const SignInOAuthButtons = () => {
  const {signIn, isLoaded} = useSignIn()

  const signInWithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback"
    })
  }

  if(!isLoaded){
    return null
  }

  return (
    <Button onClick={signInWithGoogle} variant={"secondary"} className="h-11 w-full text-white border-zinc-200">
      Continue with Google
    </Button>
  )
}

export default SignInOAuthButtons