import useConversation from "../zustand/useConversation";
import { useState } from "react";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/auth/message/send/${selectedConversation._id}`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data = res.json().then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const messageData = data.sendMessage
        setMessages(messageData);
        console.log(messages)
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
