import { Fragment, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import Button from "../ui/Button";

const ChatRoomPage = () => {
  const nickname = new URLSearchParams(location.search).get("nickname");
  const chatRoomId = new URLSearchParams(location.search).get("chatRoomId");
  const [chats, setChats] = useState([]);
  const [msgContent, setMsgContent] = useState("");

  const sockJS = new SockJS("/stomp/chat");
  const stomp = Stomp.over(sockJS);
  // stomp.heartbeat.outgoing = 0; //Rabbit에선 heartbeat 안먹힌다고 함
  // stomp.heartbeat.incoming = 0; //Rabbit에선 heartbeat 안먹힌다고 함

  function onError(e) {
    console.log("STOMP ERROR", e);
  }

  function onDebug(m) {
    console.log("STOMP DEBUG", m);
  }

  stomp.debug = onDebug;

  stomp.connect(
    "guest",
    "guest",
    function (frame) {
      console.log("STOMP Connected");

      stomp.subscribe(
        `/exchange/chat.exchange/room.${chatRoomId}`,
        function (content) {
          const payload = JSON.parse(content.body);

          let className = payload.nickname == nickname ? "mine" : "yours";

          setChats((prevData) => [...prevData, {
            className, nickname, message: msgContent
          }]);

          //밑의 인자는 Queue 생성 시 주는 옵션
          //auto-delete : Consumer가 없으면 스스로 삭제되는 Queue
          //durable : 서버와 연결이 끊겨도 메세지를 저장하고 있음
          //exclusive : 동일한 이름의 Queue 생길 수 있음
        },
        { "auto-delete": true, durable: false, exclusive: false }
      );

      //입장 메세지 전송
      stomp.send(
        `/pub/chat.enter.${chatRoomId}`,
        {},
        JSON.stringify({
          memberId: 1,
          nickname: nickname,
        })
      );
    },
    onError,
    "/"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    stomp.send(
      `/pub/chat.message.${chatRoomId}`,
      {},
      JSON.stringify({
        message: msgContent,
        memberId: 1,
        nickname: nickname,
      })
    );
    setMsgContent("");
  };

  return (
    <Fragment>
      <h1>Chat Room</h1>
      <h2>Room.No. {chatRoomId}</h2>
      <h2>안녕하세요 {nickname}님</h2>
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            id="message"
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <Button type="submit">전송</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="w-64 h-80 bg-gray-300 p-4 rounded-md shadow-md">
          <h1>채팅방 입장</h1>
          {chats.map((chat, index) => (
            <div key={index} className={chat.className}>
              <div>{chat.nickname}</div>
              <div>{chat.message}</div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default ChatRoomPage;