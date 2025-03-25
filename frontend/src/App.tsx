import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import AlbumPage from "./pages/AlbumPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
