import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthenticationStatus } from "@nhost/react";
import AuthPage from "./AuthPage";
import ChatPage from "./ChatPage";
import "./App.css";

export default function App() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/*" element={<AuthPage />} />
        ) : (
          <Route path="/chat" element={<ChatPage />} />
        )}
      </Routes>
    </Router>
  );
}
