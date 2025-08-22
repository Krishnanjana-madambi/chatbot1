import { useEffect, useState } from "react";
import { nhost } from "./nhost";
import AuthPage from "./AuthPage";
import ChatPage from "./ChatPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const PrivateRoute = ({ user, children }: { user: any; children: JSX.Element }) => {
  return user ? children : <Navigate to="/" />;
};

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = nhost.auth.getUser();
    setUser(currentUser);
    setLoading(false);

    // Listen for auth state changes
    const unsubscribe = nhost.auth.onAuthStateChanged((event, session) => {
      if (event === "SIGNED_IN") setUser(session?.user || null);
      if (event === "SIGNED_OUT") setUser(null);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        {/* Show AuthPage if user is not logged in */}
        <Route path="/" element={user ? <Navigate to="/chat" /> : <AuthPage />} />

        {/* Protected ChatPage */}
        <Route
          path="/chat"
          element={
            <PrivateRoute user={user}>
              <ChatPage user={user} onLogout={() => nhost.auth.signOut()} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
