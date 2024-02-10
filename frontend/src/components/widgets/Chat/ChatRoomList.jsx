import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Button from "../../../ui/Button";

const ChatRoomList = ({ onChatRoomSelect }) => {
  const userId = useSelector((state) => state.auth.userId);
  const { conceptColor } = useSelector((state) => state.concept)
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
      console.log("res data", res.data)
      console.log(chatroomList)

    } catch (error) {
      console.error(error);
    }
  };

  const enterChatroomHandler = (chatroom) => {
    onChatRoomSelect(chatroom.chatroomName, chatroom.chatroomId);
  };
  return (
    <div className="w-auto">
      {chatroomList.chatroomList.length > 0 && chatroomList.chatroomList.map((chatroom) => (
        <div key={chatroom.chatroomId}>
          <Button onClick={() => enterChatroomHandler(chatroom)} className={`w-[90%] m-1 bg-${conceptColor}-200 rounded-full`}>
            {chatroom.chatroomName}
          </Button>
        </div>
      ))}
      {chatroomList.chatroomList.length && <div className="flex flex-col justify-center items-center h-full">
          <p className={`text-lg font-semibold animate-bounce text-${conceptColor}-400`}>열려 있는 채팅방이 없어요</p>
        </div>}
    </div>
  );
};

export default ChatRoomList;
