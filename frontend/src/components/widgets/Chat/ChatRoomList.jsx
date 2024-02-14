import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import Button from "../../../ui/Button";

const LoadingDiv = () => {
  return <div className="flex flex-col justify-center items-center h-full">
    <ClipLoader />
  </div>
}


const ChatRoomList = ({ onChatRoomSelect }) => {
  const {userId} = useSelector((state) => state.auth);
  const { conceptColor } = useSelector((state) => state.concept)
  const [isLoading, setIsLoading] = useState(true);
  const [chatroomList, setChatroomList] = useState({ chatroomList: [] });

  useEffect(() => {
    
    if (userId) {
      console.log("getChatroomList 직전 userId : ", userId)
      getChatroomList(userId);
    }
  }, [userId]);

  const getChatroomList = async (userId) => {
    
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/message/chat/list/${userId}`
      );
      setChatroomList(res.data);
      // console.log("res data", res.data)
    } catch (error) {
      console.error(error);
    } finally {setIsLoading(false)}
  };

  const enterChatroomHandler = (chatroom) => {
    onChatRoomSelect(chatroom.chatroomName, chatroom.chatroomId);
  };
  return (
    <div className="w-auto h-full">
      {chatroomList.chatroomList.length > 0 && chatroomList.chatroomList.map((chatroom) => (
        <div key={chatroom.chatroomId}>
          <Button onClick={() => enterChatroomHandler(chatroom)} className={`w-[90%] m-1 bg-${conceptColor}-200 rounded-full`}>
            {chatroom.chatroomName}
          </Button>
        </div>
      ))}
      {isLoading && <LoadingDiv />}
      {!isLoading && chatroomList.chatroomList.length === 0 && <div className="flex flex-col justify-center items-center h-full">
        <p className={`text-lg font-semibold animate-bounce text-${conceptColor}-400`}>열려 있는 채팅방이 없어요</p>
      </div>}
    </div>
  );
};

export default ChatRoomList;
