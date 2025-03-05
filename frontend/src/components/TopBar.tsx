import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom"
import SignInOAuthButtons from "./SignInOAuthButtons"

const TopBar = () => {
  const isAdmin = false
  return (
    <div className="flex items-center justify-between sticky top-0 p-4 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">Music Spotify</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin">
            <LayoutDashboardIcon className="size-4 mr-2"/> Admin Dashboard
          </Link>
        )}

        <SignedIn>
          <SignOutButton>Logout</SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  )
}

export default TopBar