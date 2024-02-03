import { Fragment, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

import Button from "../ui/Button";

const sockjsEndpoint = 'https://i10a701.p.ssafy.io/api/message/stomp/chat';
const stompEndpoint = 'wss://i10a701.p.ssafy.io/api/message/stomp/chat';

const ChatRoomPage = () => {
  const params = useParams();
  const chatRoomId = params.chatRoomId;
  const nickname = new URLSearchParams(location.search).get("nickname");
  const inputRef = useRef("");
  const [stomp, setStomp] = useState(null);
  const [chats, setChats] = useState([
    { nickname: "관리자", message: "--님이 입장하셨습니다." },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const onError = () => {
    console.log("에러 남");
  };

  useEffect(() => {
    console.log("또 실행되면 나옴 유즈이펙트 안에 있음");
    // inputRef.current.focus();
    const sockJS = new SockJS(sockjsEndpoint)
    
    const stompClient = new Client({ webSocketFactory: () => new WebSocket(stompEndpoint), debug: (str) => console.log(str) });

    stompClient.configure({
      brokerURL: stompEndpoint,
      onConnect: () => {
        console.log('Connected to STOMP');
      }

      // stompClient.subcribe();
    })

    stompClient.activate();



    // stompClient.connect(
    //   "yoonjae",
    //   "dbswoWkd",
    //   function (frame) {
    //     console.log("Connected to Stomp");

    //     stompClient.subscribe(
    //       `/exchange/chat.exchange/room.${chatRoomId}`,
    //       function (message) {
    //         const chatDto = JSON.parse(message.body);

    //         setChats((prevData) => [
    //           ...prevData,
    //           {
    //             [chatDto.nickname]: chatDto.message,
    //           },
    //         ]);
    //       },
    //       function (error) {
    //         console.error("Stomp connection error", error);
    //       }
    //     );
    //   });

    //     //입장 메세지 전송
    //     stompClient.send(
    //       `/pub/chat.enter.${chatRoomId}`,
    //       {},
    //       JSON.stringify({
    //         memberId: 1,
    //         nickname: nickname,
    //       })
    //     );
    //   },
    //   onError,
    //   "/"
    // );
    // setStomp(stompClient);
  }, [chatRoomId, nickname]);

  const submitHandler = (event) => {
    event.preventDefault();

    // stomp.send(
    //   "/pub/chat.message.1",
    //   {}, 
    //   JSON.stringify({
    //     message: inputRef.current,
    //     memberId: 1,
    //     nickname: "YourNickname",
    //   })
    // );
    // inputRef.current.valueOf("");
    setInputMsg("");
  };

  return (
    <Fragment>
      <h1>Chat Room</h1>
      <h2>Room.No. {chatRoomId}</h2>
      <h2>안녕하세요 {nickname}님</h2>
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            ref={inputRef}
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <Button type="submit">전송</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="w-64 h-80 bg-gray-300 p-4 rounded-md shadow-md">
          <h1>채팅방 입장</h1>
          <div id="chatArea">
            {chats.map((msg) => (
              <li key={msg.message}>{`${msg.nickname} : ${msg.message}`}</li>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ChatRoomPage
