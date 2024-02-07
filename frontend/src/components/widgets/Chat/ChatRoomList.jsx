import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Button from "../../../ui/Button";

const ChatRoomList = ({ onChatRoomSelect }) => {
  const userId = useSelector((state) => state.auth.userId);
  const [chatroomList, setChatroomList] = useState({ chatroomList: [] });
  useEffect(() => {
    if (userId) {
      getChatroomList(userId);
    }
  }, [userId]);

  const getChatroomList = async (userId) => {
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/message/chat/list/${userId}`
      );
      setChatroomList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const enterChatroomHandler = (chatroomId) => {
    onChatRoomSelect(chatroomId);
  };
  return (
    <div className="w-auto">
      {chatroomList.chatroomList.map((chatroom) => (
        <div key={chatroom.chatroomId}>
          <Button onClick={() => enterChatroomHandler(chatroom.chatroomId)} className="w-[90%] m-1 bg-red-200 rounded-full">
            {chatroom.chatroomName}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
