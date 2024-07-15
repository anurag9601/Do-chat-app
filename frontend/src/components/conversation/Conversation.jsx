import React, { useContext } from "react";
import { contextApi } from "../../context/Context";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ user }) => {
  const { setNoChat } = useContext(contextApi);

  const { setSelectedConversation } = useConversation();
  return (
    <div
      className={`user`}
      onClick={() => {
        setNoChat(false);
        setSelectedConversation(user);
      }}
    >
      <img src={user.profilePic} alt="" />
      <h3>{user.fullName}</h3>
    </div>
  );
};

export default Conversation;
