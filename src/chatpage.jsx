import { gql, useQuery, useMutation, useSubscription } from '@apollo/client';

// --- GraphQL Operations ---
const MY_CHATS = gql`
  query MyChats {
    chats(order_by: { created_at: desc }) {
      id
      title
      created_at
    }
  }
`;

const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: { title: $title }) {
      id
      title
      created_at
    }
  }
`;

const SEND_USER_MESSAGE = gql`
  mutation SendUserMessage($chat_id: uuid!, $content: String!) {
    insert_messages_one(object: { chat_id: $chat_id, content: $content }) {
      id
    }
  }
`;

const ASK_BOT = gql`
  mutation AskBot($chat_id: uuid!, $text: String!) {
    sendMessage(chat_id: $chat_id, text: $text) {
      ok
      reply
      message_id
    }
  }
`;

const ON_MESSAGES = gql`
  subscription OnMessages($chat_id: uuid!) {
    messages(where: { chat_id: { _eq: $chat_id } }, order_by: { created_at: asc }) {
      id
      sender
      content
      created_at
    }
  }
`;

// --- Use them inside component ---
export default function ChatPage() {
  const { data, loading } = useQuery(MY_CHATS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [sendUserMessage] = useMutation(SEND_USER_MESSAGE);
  const [askBot] = useMutation(ASK_BOT);
  const { data: messagesData } = useSubscription(ON_MESSAGES, {
    variables: { chat_id: 'your-chat-id' },
  });

  // Your component logic
}
