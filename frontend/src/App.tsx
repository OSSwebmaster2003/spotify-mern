import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route 
          path='/sso-callback' 
          element={<AuthenticateWithRedirectCallback 
          signUpForceRedirectUrl={"/auth-callback"} />} 
        />
        <Route path='/auth-callback' element={<AuthCallbackPage />} />
      </Routes>
    </>
  )
}

export default App