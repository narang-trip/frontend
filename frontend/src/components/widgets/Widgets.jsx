import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import CalendarCp from "./CalendarCp";
import ChatRoomList from "./Chat/ChatRoomList";
import Chat from "./Chat/Chat";
import { useSelector } from "react-redux";

export default function Widgets() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [activeChatRoomList, setActiveChatRoomList] = useState(true);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);

  const handleChatRoomSelect = (chatRoomId) => {
    setSelectedChatRoomId(chatRoomId);
    setActiveChatRoomList(false);
  };
  return (
    <div className="text-center">
      <CalendarCp />
      {!isLogin && (
        <div className="justify-center items-center">
          로그인을 먼저 해주세요
        </div>
      )}
      {isLogin &&
        (activeChatRoomList ? (
          <ChatRoomList onChatRoomSelect={handleChatRoomSelect} />
        ) : (
          <Chat chatroomId={selectedChatRoomId} />
        ))}
    </div>
  );
}
