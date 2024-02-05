import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import Button from "../ui/Button";
import { Client, Stomp } from "@stomp/stompjs";

const userId = "조예진";
const sockJSEndPoint = "https://i10a701.p.ssafy.io/api/message/chat"
const stompEndpoint = "wss://i10a701.p.ssafy.io/api/message/chat";
const ChatPage = () => {
  // useEffect(() => {
  //   const EventSource = EventSourcePolyfill || NativeEventSource;
  //   const eventSource = new EventSource(
  //     `https://i10a701.p.ssafy.io/api/message/alert/subscribe/${userId}`
  //   );

  //   eventSource.addEventListener("sse", (event) => {
  //     const { data: receivedConnectData } = event;
  //     console.log(receivedConnectData);
  //     if (receivedConnectData === "SSE 연결이 완료되었습니다.") {
  //       // "SSE connection has been completed."
  //       console.log("SSE CONNECTED");
  //     } else {
  //       console.log(event);
  //     }
  //   });

  //   return () => {
  //     eventSource.close();
  //     console.log("SSE CLOSED");
  //   };
  // }, []);

  useEffect(() => {
    // SockJS와 Stomp 설정
    const socket = new SockJS(sockJSEndPoint);
    const stompClient = new Client({
      webSocketFactory: () => socket, // SockJS 인스턴스를 사용하여 웹소켓 연결
      onConnect: (frame) => {
        console.log('Connected', frame);

        // 서버로부터 메시지를 받을 구독 설정
        stompClient.subscribe('/sub/chat/room/room1', message => {
          console.log(`Received: ${message.body}`);
        });

        // 서버로 메시지 전송
        stompClient.publish({
          destination: '/pub/chat/send',
          body: JSON.stringify({ chatroomId : "room1", senderId : "조예진", content : "이제 해방이다"}),
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



  //스톰프 용 잠시 꺼놈
  //   const stompClient = new Client({
  //     webSocketFactory: () => webSocket, // SockJS 인스턴스를 사용하여 웹소켓 연결
  //     onConnect: () => {
  //       console.log('Connected');

  //       // 서버로부터 메시지를 받을 구독 설정
  //       stompClient.subscribe('/sub', message => {
  //         console.log(`Received: ${message.body}`);
  //       });

  //       // 서버로 메시지 전송
  //       stompClient.publish({
  //         destination: '/pub',
  //         body: 'First Message',
  //       });
  //     },
  //     // 오류 처리
  //     onStompError: (frame) => {
  //       // STOMP 오류 처리
  //       console.error('Broker reported error: ' + frame.headers['message']);
  //       console.error('Additional details: ' + frame.body);
  //     },
  //     onWebSocketError: (evt) => {
  //       // 웹소켓 오류 처리
  //       console.error('WebSocket error', evt);
  //     },
  //   });

  //   // 웹소켓 연결 활성화
  //   stompClient.activate();

  //   // 컴포넌트 언마운트 시 연결 종료
  //   return () => {
  //     stompClient.deactivate();
  //   };
  // }, []);

  return (
    <div className="">
      <div className="">
        <label>
          <b>채팅방</b>
        </label>
      </div>
    </div>
  );
};

export default ChatPage;
