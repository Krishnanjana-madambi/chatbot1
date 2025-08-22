import { nhost } from "./nhost";

export default function ChatPage() {
  const handleLogout = async () => {
    await nhost.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Chat Page 🎉</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
