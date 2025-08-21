// src/graphql.ts
import { gql } from "@apollo/client";

// --- Queries ---
export const MY_CHATS = gql`
  query MyChats {
    chats {
      id
      title
    }
  }
`;

// --- Mutations ---
export const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
    }
  }
`;

export const SEND_USER_MESSAGE = gql`
  mutation SendUserMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, content: $content }) {
      id
      content
      sender
    }
  }
`;

export const ASK_BOT = gql`
  mutation AskBot($chat_id: uuid!, $text: String!) {
    ask_bot(chat_id: $chat_id, text: $text) {
      id
      content
      sender
    }
  }
`;

// --- Subscriptions ---
export const ON_MESSAGES = gql`
  subscription OnMessages($chat_id: uuid!) {
    messages(where: { chat_id: { _eq: $chat_id } }) {
      id
      content
      sender
    }
  }
`;
