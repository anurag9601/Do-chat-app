import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const { setMessages, messages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/auth/message/get/${selectedConversation._id}`
        );
        const data = res.json().then((data) => {
          try {
            if(!data){
              setMessages([]);
            }
            const realData = data.messages;
            setMessages(realData);
          } catch (error) {}
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation._id) getMessages();
  }, [selectedConversation._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
