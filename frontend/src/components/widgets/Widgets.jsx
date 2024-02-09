import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CalendarCp from "./CalendarCp";
import ChatRoomList from "./Chat/ChatRoomList";
import Chat from "./Chat/Chat";
import { useSelector } from "react-redux";

export default function Widgets() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [activeChatRoomList, setActiveChatRoomList] = useState(true);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const [selectedChatRoomName, setSelectedChatRoomName] = useState("");
  const chatScrollRef = useRef(null);


  const handleChatRoomSelect = (chatroomName, chatroomId) => {
    setSelectedChatRoomName(chatroomName)
    setSelectedChatRoomId(chatroomId);
    setActiveChatRoomList(false);
  };
  
  const navigateBack = () => {
    setActiveChatRoomList(true);
    setSelectedChatRoomId(null); // 선택된 채팅방 ID를 초기화
  };
  return (
    <div className="text-center relative">
     
      <CalendarCp />
      <div className="h-[43vh] mt-3 bg-blue-200 rounded-lg" ref={chatScrollRef}>
        {!isLogin && (
          <div className="justify-center items-center">
            로그인을 먼저 해주세요
          </div>
        )}
        {isLogin &&
          (activeChatRoomList ? (
            <ChatRoomList onChatRoomSelect={handleChatRoomSelect} />
          ) : (
            <Chat chatroomId={selectedChatRoomId} navigateBack={navigateBack} chatroomName={selectedChatRoomName}/>
          ))}
      </div>
    </div>
  );
}
