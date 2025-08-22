import { useState } from "react";
import { nhost } from "./nhost";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = isSignIn
        ? await nhost.auth.signIn({ email, password })
        : await nhost.auth.signUp({ email, password });

      if (response.error) {
        setError(response.error.message);
      } else {
        navigate("/chat");
      }
    } catch (err: any) {
      setError("Unexpected error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="switch-text">
          {isSignIn ? (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsSignIn(false)}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsSignIn(true)}>Sign In</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
