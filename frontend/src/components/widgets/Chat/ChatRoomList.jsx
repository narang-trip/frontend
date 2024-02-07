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
      console.log(chatroomList)
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
    <div>
      {chatroomList.chatroomList.map((chatroom) => (
        <div key={chatroom.chatroomId}>
          <Button onClick={() => enterChatroomHandler(chatroom.chatroomId)}>
            {chatroom.chatroomName}
          </Button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
