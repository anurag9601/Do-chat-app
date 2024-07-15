import React, { useContext, useRef } from "react";
import "./Chats.css";
import { FiSend } from "react-icons/fi";
import useConversation from "../../zustand/useConversation";
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from "../../hooks/useGetMessages";
import Chatbox from "../Chatbox/Chatbox";

const Chats = () => {
  const { selectedConversation } = useConversation();

  const { loading, sendMessage } = useSendMessage();

  const { messages } = useGetMessages();

  const messageRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await sendMessage(messageRef.current.value);
    messageRef.current.value = "";
  };

  return (
    <div className="chats-container">
      <div className="chat-head">
        <img src={selectedConversation.profilePic} alt="" />
        <h3>{selectedConversation.fullName}</h3>
      </div>
      {messages.length === 0 && (
        <div className="message">
          <p>Send a message to start the conversation</p>
        </div>
      )}
      {messages.length > 0 &&
        messages.map((message) => (
          <Chatbox key={message._id} message={message} />
        ))}
      <form className="message-box" onSubmit={(e) => handleSendMessage(e)}>
        <div className="message-input-box">
          <input type="text" placeholder="Message.." ref={messageRef} />
          <button type="submit">
            Send <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chats;
