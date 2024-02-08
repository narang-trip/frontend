import { useEffect, useRef, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CalendarCp from "./CalendarCp";
import ChatRoomList from "./Chat/ChatRoomList";
import Chat from "./Chat/Chat";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";

export default function Widgets() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [activeChatRoomList, setActiveChatRoomList] = useState(true);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const chatScrollRef = useRef(null);

  useEffect(() => {

    if (chatScrollRef.current) {
      const { scrollHeight, clientHeight } = chatScrollRef.current;
      chatScrollRef.current.scrollTop = scrollHeight - clientHeight;
    }

  }, [selectedChatRoomId, activeChatRoomList])

  const handleChatRoomSelect = (chatRoomId) => {
    setSelectedChatRoomId(chatRoomId);
    setActiveChatRoomList(false);
  };

  const navigateBack = () => {
    setActiveChatRoomList(true);
    setSelectedChatRoomId(null); // 선택된 채팅방 ID를 초기화
  };
  return (
    <div className="text-center relative">
     
      <CalendarCp />
      <div className="h-[40vh] overflow-auto mt-3 bg-blue-200 rounded-lg" ref={chatScrollRef}>
        {!isLogin && (
          <div className="justify-center items-center">
            로그인을 먼저 해주세요{" "}
          </div>
        )}
        {isLogin &&
          (activeChatRoomList ? (
            <ChatRoomList onChatRoomSelect={handleChatRoomSelect} />
          ) : (
            <Chat chatroomId={selectedChatRoomId} navigateBack={navigateBack}/>
          ))}
      </div>
    </div>
  );
}
