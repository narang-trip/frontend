import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient} from 'react-query';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import Button from "../ui/Button";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

const userId = "조예진"
const sockjsEndpoint = 'https://i10a701.p.ssafy.io/api/message/chat';
const stompEndpoint = 'wss://i10a701.p.ssafy.io/api/message/chat';

const ChatPage = () => {
  const queryClient = useQueryClient();

  const [newNotice, setNewNotice] = useState();
  const [newStatus, setStatus] = useState();
  const [newApply, setNewApply] = useState();
  
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(`https://i10a701.p.ssafy.io/api/message/alert/subscribe/${userId}`);

    eventSource.addEventListener('connect', (event) => {
      const { data: receivedConnectData } = event;
      if (receivedConnectData === 'SSE 연결이 완료되었습니다.') { // "SSE connection has been completed."
        console.log('SSE CONNECTED');
      } else {
        console.log(event);
      }
    });

    eventSource.addEventListener('newNotice', (event) => {
      const newNoticeInfo = JSON.parse(event.data);
      setNewNotice(newNoticeInfo);
      // Invalidate queries to update data
      queryClient.invalidateQueries('noticeCnt');
      queryClient.invalidateQueries('noticeList');
      queryClient.invalidateQueries(['unreadReceiveList', 0]);
    });

    eventSource.addEventListener('statusChange', (event) => {
      const newStatusInfo = JSON.parse(event.data);
      setStatus(newStatusInfo);
      // Invalidate queries to update data
      queryClient.invalidateQueries('noticeCnt');
      queryClient.invalidateQueries('noticeList');
      queryClient.invalidateQueries(['unreadReceiveList']);
      queryClient.invalidateQueries('apiCount');
      queryClient.invalidateQueries('apiStatuslist 전체');
      queryClient.invalidateQueries(['apiStatus']);
    });

    eventSource.addEventListener('newApply', (event) => {
      const newApplyInfo = JSON.parse(event.data);
      setNewApply(newApplyInfo);
      // Invalidate queries to update data
      queryClient.invalidateQueries('noticeCnt');
      queryClient.invalidateQueries('noticeList');
      queryClient.invalidateQueries(['unreadReceiveList']);
      queryClient.invalidateQueries(['provideApplyList']);
      queryClient.invalidateQueries(['useApplyList']);
    });

    return () => {
      eventSource.close();
      console.log('SSE CLOSED');
    };
  }, []);
  

  // useEffect(() => {
  //   // SockJS와 Stomp 설정
  //   const socket = new SockJS(sockjsEndpoint);
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket, // SockJS 인스턴스를 사용하여 웹소켓 연결
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
  //   });

  //   // 웹소켓 연결 활성화
  //   stompClient.activate();

  //   // 컴포넌트 언마운트 시 연결 종료
  //   return () => {
  //     stompClient.deactivate();
  //   };
  // }, []);
  useEffect(() => {

    // SockJS와 Stomp 설정
    // webSocket.onopen = function () {
    //   console.log('서버와 웹소켓 연결 성공!');
    // };
    // webSocket.onmessage = function (event) {
    //   console.log(event.data);
    //   webSocket.send('클라이언트에서 서버로 답장을 보냅니다');
    // };

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
