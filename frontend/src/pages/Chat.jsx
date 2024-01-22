import { Fragment, useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "@stomp/stompjs";
import Button from "../ui/Button";

const ChatPage = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  const nickname = new URLSearchParams(location.search).get("nickname");
  const [chats, setChats] = useState([]);
  const [msgContent, setMsgContent] = useState("");

  const client = useRef();
  const connectHaner = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(
        "/stomp/chat"
      );
      return sock;
    });
    client.current.connect(
      {
        // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음.
        // ex)
      },
      () => {
        // callback 함수 설정, 대부분 여기에 sub 함수 씀
        client.current.subscribe(
          `/exchange/chat.exchange/room.${chatRoomId}`,
          (message) => {
            setMsgContent(JSON.parse(message.body));
          },
          {
            // 여기에도 유효성 검증을 위한 header 넣어 줄 수 있음
          }
        );
      }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    client.current.send(
      `/pub/chat.message.${chatRoomId}`,
      {},
      JSON.stringify({
        message: msgContent,
        memberId: 1,
        nickname: nickname,
      })
    );
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
      <div>
        {chats.map((chat, index) => (
          <div key={index} className={chat.className}>
            <div>{chat.nickname}</div>
            <div>{chat.message}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ChatPage;

//     const messageContent = document.querySelector('#message');
//     const btnSend = document.querySelector('.btn-send');

//             chats.insertAdjacentHTML('beforeend', html);

//             //밑의 인자는 Queue 생성 시 주는 옵션
//             //auto-delete : Consumer가 없으면 스스로 삭제되는 Queue
//             //durable : 서버와 연결이 끊겨도 메세지를 저장하고 있음
//             //exclusive : 동일한 이름의 Queue 생길 수 있음
//         },{'auto-delete':true, 'durable':false, 'exclusive':false});

//         //입장 메세지 전송
//         stomp.send(`/pub/chat.enter.${chatRoomId}`, {}, JSON.stringify({
//             memberId: 1,
//             nickname: nickname
//         }));

//     }, onError, '/');

//     //메세지 전송 버튼 click
//     btnSend.addEventListener('click', (e) => {
//         e.preventDefault();

//         const message = messageContent.value;
//         messageContent.value = '';

//         stomp.send(`/pub/chat.message.${chatRoomId}`, {}, JSON.stringify({
//             message: message,
//             memberId: 1,
//             nickname: nickname
//         }));
//     });
// </script>
