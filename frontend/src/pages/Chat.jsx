import { useEffect, useState, useRef, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../ui/Button";
import { Client, Stomp } from "@stomp/stompjs";

const userId = "조예진";
let dummyData = {
  tripId: "고잉고잉",
  tripName: "여행가요 같이",
  senderId: userId,
  receiverId: "구본승",
  position: ["몰라"],
  aspiration: "여행 뿌셔",
  alertType: "REQUEST",
  isRead: false,
};
const stompEndpoint = "wss://i10a701.p.ssafy.io/api/message/chat";
const ChatPage = () => {
  const [chatroomList, setChatroomList] = useState({ chatroomList: [] });
  const [chatList, setChatList] = useState([]);
  const [tripId, setTripId] = useState("143");

  //트립 리스트 가져오기
  const getChatroomList = async () => {
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/message/chat/list/${userId}`
      );
      console.log(res.data);
      setChatroomList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getChatList = async (chatroomId) => {
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/message/chat/${chatroomId}?page=0`
      );
      console.log(res.data);
      setChatList(res.data.chatList);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getChatroomList();
    // SockJS와 Stomp 설정
    const socket = new WebSocket(stompEndpoint);

    const stompClient = new Client({
      webSocketFactory: () => socket, // websocket 웹소켓 연결
      onConnect: (frame) => {
        console.log("Connected", frame);

        // 서버로부터 메시지를 받을 구독 설정
        stompClient.subscribe("/sub/chat/room/room1", (message) => {
          console.log(`Received: ${message.body}`);
        });

        // 서버로 메시지 전송
        stompClient.publish({
          destination: "/pub/chat/send",
          body: JSON.stringify({
            chatroomId: "room1",
            senderId: "조예진",
            content: "예진아 가지마 ㅠㅠ",
          }),
        });
      },
    });

    // 웹소켓 연결 활성화
    stompClient.activate();

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      stompClient.deactivate();
    };
  }, []);

  const clickHandler = async () => {
    dummyData = { ...dummyData, tripId: tripId };
    try {
      const response = await axios.post(
        "https://i10a701.p.ssafy.io/api/message/alert/attend",
        dummyData,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      console.log("SSE 요청 입니다", response.data);
    } catch (error) {
      console.error("Error", error.response);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    clickHandler();
  };

  const enterChatroomHandler = (chatroomId) => {
    getChatList(chatroomId)
  };
  return (
    <div className="">
      <b>채팅방</b>
      <form onSubmit={submitHandler}>
        <input
          placeholder="여기 tripid써주세요"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
        <button type="submit" className="border border-solid bg-blue">
          이거 누르면 알림 가요
        </button>
      </form>
      <hr />
      <hr />
      <hr />
      <div>
        {chatroomList.chatroomList.map((chatroom) => (
          <div key={chatroom.chatroomId}>
            <Button onClick={() => enterChatroomHandler(chatroom.chatroomId)}>
              {chatroom.chatroomName}
            </Button>
            <hr />
          </div>
        ))}
      </div>
      <div>chatRoom</div>
      <hr />
      <hr />
      <hr />
      {chatList.map((chat) => {
        return (
          <div key={chat.chatId}>
            {chat.sendTime} : {chat.userId} : {chat.content}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default ChatPage;
