import { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  MY_CHATS,
  CREATE_CHAT,
  SEND_USER_MESSAGE,
  ASK_BOT,
  ON_MESSAGES,
} from "./graphql";
import { nhost, User } from "./nhost";

interface ChatPageProps {
  user: User;
  onLogout: () => void;
}

export default function ChatPage({ user, onLogout }: ChatPageProps) {
  const [newChatTitle, setNewChatTitle] = useState("");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const { data: chatsData, refetch: refetchChats } = useQuery(MY_CHATS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [sendUserMessage] = useMutation(SEND_USER_MESSAGE);
  const [askBot] = useMutation(ASK_BOT);

  const { data: messagesData } = useSubscription(ON_MESSAGES, {
    variables: { chat_id: selectedChat?.id },
    skip: !selectedChat,
  });

  useEffect(() => {
    if (messagesData?.messages) setMessages(messagesData.messages);
  }, [messagesData]);

  const handleCreateChat = async () => {
    if (!newChatTitle) return;
    try {
      await createChat({ variables: { title: newChatTitle } });
      setNewChatTitle("");
      refetchChats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText || !selectedChat) return;
    try {
      await sendUserMessage({
        variables: { chat_id: selectedChat.id, content: messageText },
      });
      await askBot({
        variables: { chat_id: selectedChat.id, text: messageText },
      });
      setMessageText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem", height: "80vh" }}>
      {/* Chats List */}
      <div style={{ width: "200px" }}>
        <h3>Your Chats</h3>
        <input
          type="text"
          placeholder="New chat title"
          value={newChatTitle}
          onChange={(e) => setNewChatTitle(e.target.value)}
        />
        <button onClick={handleCreateChat}>Create</button>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {chatsData?.chats?.length
            ? chatsData.chats.map((chat: any) => (
                <li
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  style={{
                    padding: "5px",
                    cursor: "pointer",
                    backgroundColor:
                      selectedChat?.id === chat.id ? "#eee" : "transparent",
                  }}
                >
                  {chat.title}
                </li>
              ))
            : "No chats yet"}
        </ul>
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3>Welcome, {user.email}</h3>
          <button
            onClick={async () => {
              await nhost.auth.signOut();
              onLogout();
            }}
          >
            Logout
          </button>
        </div>

        {selectedChat ? (
          <div>
            <h3>Chat: {selectedChat.title}</h3>
            <div
              style={{
                border: "1px solid #ccc",
                height: "300px",
                overflowY: "auto",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {messages.length
                ? messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: "5px" }}>
                      <b>{msg.sender === user.id ? "You" : "Bot"}:</b>{" "}
                      {msg.content}
                    </div>
                  ))
                : "No messages yet"}
            </div>

            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              style={{ width: "70%" }}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        ) : (
          <p>Select a chat to start messaging.</p>
        )}
      </div>
    </div>
  );
}

