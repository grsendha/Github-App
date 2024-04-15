import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
function App() {
  const { authUser, loading } = useAuthContext();
  console.log("Authenticated User", authUser);

  if (loading) return null;
  return (
    <div className="flex ">
      <Sidebar />
      <div className="max-w-5xl  text-white mx-auto transition-all duration-300 flex-1 ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}
          />
          <Route
            path="/explore"
            element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/likes"
            element={authUser ? <LikesPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
