import { Fragment, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import Button from "../../../ui/Button";
import { useSelector } from "react-redux";

const stompEndpoint = "wss://i10a701.p.ssafy.io/api/message/chat";
const Chat = ({ chatroomId }) => {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  let stompClient = useRef(null);
  useEffect(() => {
    getChatList(chatroomId, 0);
    if (!stompClient.current) {
      // stompClient 인스턴스 초기화 확인
      const socket = new WebSocket(stompEndpoint);
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        onConnect: (frame) => {
          console.log("Connected", frame);

          // 구독 설정
          stompClient.current.subscribe(
            `/sub/chat/room/${chatroomId}`,
            (message) => {
              console.log(`Received: ${message.body}`);
              const chat = {
                userId : userId,
                sendTime : message.body.sendTime,
                content : message.body.content
              }
              setChats((prevChats) => [...prevChats, chat]);
            }
          );

          // 메시지 전송
          stompClient.current.publish({
            destination: "/pub/chat/send",
            body: JSON.stringify({
              chatroomId: chatroomId,
              senderId: "관리자",
              content: "누군가님이 입장했습니다.",
            }),
          });
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
  
      setChats(res.data.chatList);
      console.log(chats)
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!msg.trim()) return; // 메시지가 비어있는 경우 전송하지 않음

    // 메시지 전송
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/pub/chat/send",
        body: JSON.stringify({
          chatroomId: chatroomId,
          senderId: userId, // 실제 사용자 ID로 교체 필요
          content: msg,
        }),
      });
      setMsg(""); // 메시지 전송 후 입력 필드 초기화
    }
  };
  return (
    <Fragment>
      {chats.map((chat) => {
        const date = new Date(chat.sendTime);

        const formattedDate = `
          ${date.getHours()}시 ${date.getMinutes()}분`;
        return (
          <div key={chat.chatId}>
            {formattedDate}
            <hr /> {chat.userId} : {chat.content}
            <hr />
          </div>
        );
      })}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="메시지 입력해주세요"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit">전송</Button>
      </form>
    </Fragment>
  );
};

export default Chat;
