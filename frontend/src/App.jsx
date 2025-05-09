import { useState } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Settings from "./pages/settings/Settings";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
		<Route 
		  path="/settings"
		  element={authUser ? <Settings /> : <Login />} 
		/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
