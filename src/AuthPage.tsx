import { useState } from "react";
import { nhost } from "./nhost";  // import your Nhost client

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");

  // Sign Up function
  const handleSignUp = async () => {
    try {
      const result = await nhost.auth.signUp({ email, password });
      if (result.error) {
        setMessage("Sign up failed: " + result.error.message);
      } else {
        setMessage("Sign up successful! You can now sign in.");
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  // Sign In function
  const handleSignIn = async () => {
    try {
      const result = await nhost.auth.signIn({ email, password });
      if (result.error) {
        setMessage("Sign in failed: " + result.error.message);
      } else {
        const currentUser = nhost.auth.getUser();
        setUser(currentUser);
        setMessage("Sign in successful!");
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Nhost Auth Demo</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <p>{message}</p>
      {user && (
        <div>
          <h3>Logged in user:</h3>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      )}
    </div>
  );
}
