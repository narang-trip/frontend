import { Fragment, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import Button from "../../../ui/Button";
import { useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";

const stompEndpoint = "wss://i10a701.p.ssafy.io/api/message/chat";
const Chat = ({ chatroomId }) => {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  const chatListRef = useRef(null);
  let stompClient = useRef(null);
  useEffect(() => {
    getChatList(chatroomId, 0);
    if (!stompClient.current) {
      // stompClient 인스턴스 초기화 확인
      const socket = new WebSocket(stompEndpoint);
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        onConnect: (frame) => {
          // 구독 설정
          stompClient.current.subscribe(
            `/sub/chat/room/${chatroomId}`,
            (message) => {
              const messageBody = JSON.parse(message.body);
              console.log(`Received: ${messageBody}`);
              console.log(messageBody.sendTime)
              console.log(messageBody.content)
              const chat = {
                userId: userId,
                sendTime: messageBody.sendTime,
                content: messageBody.content,
              };
              setChats((prevChats) => [...prevChats, chat]);
            }
          );

          // 메시지 전송
          // stompClient.current.publish({
          //   destination: "/pub/chat/send",
          //   body: JSON.stringify({
          //     chatroomId: chatroomId,
          //     senderId: "관리자",
          //     content: "누군가님이 입장했습니다.",
          //   }),
          // });
        },
      });
      stompClient.current.activate(); // 웹소켓 연결 활성화
    }

    // 컴포넌트 언마운트 시 연결 종료 처리
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, [chatroomId]);

  const getChatList = async (chatroomId, page) => {
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/message/chat/${chatroomId}?page=${page}`
      );
      const chatList = [...res.data.chatList].reverse(); //순서 맞추기 위해서 뒤집어서 넣어주기
      setChats(chatList);

    } catch (error) {
      console.error(error);
    }
  };

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     if (chatListRef.current) {
  //       const { scrollHeight } = chatListRef.current;
  //       chatListRef.current.scrollTop = scrollHeight;
  //     }
  //   }, 0);
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!msg.trim()) return; // 메시지가 비어있는 경우 전송하지 않음

    // 메시지 전송
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/pub/chat/send",
        body: JSON.stringify({
          chatroomId: chatroomId,
          senderId: userId,
          content: msg,
        }),
      });
      setMsg(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  const navigateBack = () => {};
  return (
    <Fragment>
      <button onClick={navigateBack} className="p-2 fixed top-0 left-0 z-10">
        <MdArrowBack className="text-2xl" /> {/* 아이콘 사이즈 조정 */}
      </button>
      <div
        className="pb-10 overflow-y-auto w-full pr-4 relative"
        ref={chatListRef}
      >
        {chats.map((chat) => {
          const date = new Date(chat.sendTime);
          const formattedDate = `${date.getHours()}시 ${date.getMinutes()}분`;
          let messageBoxClass = "w-full flex m-3 items-end";
          let messageClass =
            "text-sm rounded-lg border p-2 max-w-[80%] break-words";
          if (chat.userId === "관리자") {
            messageBoxClass += " justify-center"; // 관리자 일 땐 가운데
            messageClass += " bg-gray-200 w-[80%] border-gray-200";
            return (
              <div key={chat.chatId} className={messageBoxClass}>
                <div className={messageClass}>{chat.content}</div>
              </div>
            );
          } else if (chat.userId === userId) {
            messageBoxClass += " justify-end "; // 본인인 건 오른쪽
            messageClass += " bg-yellow-200 border-yellow-300";
            return (
              <div key={chat.chatId} className={messageBoxClass}>
                <div className="text-xs mr-1">{formattedDate}</div>
                <div className={messageClass}>{chat.content}</div>
              </div>
            );
          } else {
            messageBoxClass += " justify-start"; // 상대방은 왼쪽
            messageClass += " bg-white";
            return (
              <div key={chat.chatId} className={messageBoxClass}>
                <div className={messageClass}>{chat.content}</div>
                <div className="text-xs ml-1">{formattedDate}</div>
              </div>
            );
          }
        })}
      </div>

      <form
        onSubmit={submitHandler}
        className="absolute bottom-0 left-0 right-0 bg-white flex items-center"
      >
        <input
          type="text"
          placeholder="메시지 입력해주세요"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-grow p-2 mr-2 border rounded-lg focus:outline-none"
        />
        <Button type="submit">전송</Button>
      </form>
    </Fragment>
  );
};

export default Chat;
