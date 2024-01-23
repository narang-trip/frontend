import * as StompJS from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatRoomPage2 = () => {
  const socket = new SockJS("/websocket-endpoint"); // 웹소켓 엔드포인트 URL
  const stompClient = StompJS.over(socket);

  // 연결 성공 시 실행될 콜백 함수
  const connectCallback = () => {
    console.log("WebSocket 연결 성공");

    // 구독 설정
    stompClient.subscribe("/topic/messages", (message) => {
      console.log("받은 메시지:", message.body);
    });

    // 메시지 발송
    stompClient.send(
      "/app/sendMessage",
      {},
      JSON.stringify({ text: "Hello WebSocket" })
    );
  };

  // 연결 시도
  stompClient.connect({}, connectCallback);

  // 컴포넌트 언마운트 시 연결 종료
  // 컴포넌트 언마운트 시 연결 종료
  return () => {
    stompClient.disconnect(() => {
      console.log("WebSocket 연결 종료");
      // 추가로 수행할 로직 작성 가능
    });
  };
};

export default ChatRoomPage2;
