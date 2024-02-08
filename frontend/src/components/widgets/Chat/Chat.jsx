  import { Fragment, useCallback, useEffect, useRef, useState } from "react";
  import { Client } from "@stomp/stompjs";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { MdArrowBack } from "react-icons/md";
  import { useInView } from "react-intersection-observer";

  import Button from "../../../ui/Button";

  const stompEndpoint = "wss://i10a701.p.ssafy.io/api/message/chat";
  const Chat = ({ chatroomId, navigateBack }) => {
    const [chats, setChats] = useState([]);
    const [msg, setMsg] = useState("");
    const userId = useSelector((state) => state.auth.userId);
    const lastChatRef = useRef("");
    const chatDivRef = useRef(null);
    let stompClient = useRef(null);
    const [pageNo, setPageNo] = useState(0);

    const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '10px' // div태그가 보일 때 inView가 true로 설정
    });

    const getChatList = useCallback(
      async (chatroomId) => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_CHAT_REQUEST_URI
            }/${chatroomId}?page=${pageNo}`
          );
          
          console.log(response.data)
          // 가져올 항목이 없으면 중단
          if (response.data.chatList.length === 0) {
            return;
          }
          let chatList = response.data.chatList;
          if (pageNo === 0) {
            lastChatRef.current = chatList[chatList.length - 1];
          } else {
            for (let i = 0; i < chatList.length; i++) {
              if (chatList[i] === lastChatRef.current) {
                chatList = chatList.slice(i);
                break;
              }
            }
          }
          chatList = [...chatList].reverse();
          // 새로운 데이터를 기존 데이터에 추가
          setChats((prevData) => [...chatList, ...prevData]);
          // 페이지 번호 증가
          setPageNo((prevPageNo) => prevPageNo + 1);
        } catch (error) {
          console.error("채팅 목록 가져오는 중 에러 발생:", error);
        }
      },
      [chatroomId, pageNo]
    );

    // inView가 true일때 데이터를 가져옴
    useEffect(() => {
      if (inView && pageNo > 0) {
        console.log(`${pageNo} : 무한 스크롤 요청 🎃`);
        getChatList(chatroomId);
      }
    }, [inView]);

    useEffect(() => {
      if (chatDivRef.current && pageNo === 1) {
        chatDivRef.current.scrollTo({
          top: chatDivRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [chats]);

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
                const chat = {
                  userId: userId,
                  sendTime: messageBody.sendTime,
                  content: messageBody.content,
                };
                setChats((prevChats) => [...prevChats, chat]);
                chatDivRef.current.scrollTo({
                  top: chatDivRef.current.scrollHeight,
                  behavior: 'smooth'
                });
              }
            );
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

    return (
      <div className="h-full w-full relative">
        <div className="absolute top-0 left-0 right-0">
          <div onClick={navigateBack} className="p-2">
            {chatroomId}
          </div>
        </div>
        <div className="absolute top-0 left-0">
          <button className="p-2">
            <MdArrowBack className="text-2xl" />
          </button>
        </div>
       
        <div
          id="chats"
          ref={chatDivRef}
          className="pt-5 pb-6 overflow-y-scroll h-full pr-4"
        >
           <div ref={ref}></div>
          {chats.map((chat) => {
            const utcDate = new Date(chat.sendTime);
            const kstDate = new Date(utcDate.getTime());
            // 한국 시간대로 변환 (UTC+9)
            const formattedDate = `${kstDate.getHours()}시 ${kstDate.getMinutes()}분`;
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
              messageBoxClass += " justify-end my-1"; // 본인인 건 오른쪽
              messageClass += " bg-yellow-200 border-yellow-300";
              return (
                <Fragment key={chat.chatId}>
                  <div className="text-xs text-right m-0 justify-end">나</div>
                  <div className={messageBoxClass}>
                    <div className="text-xs mr-1">{formattedDate}</div>
                    <div className={messageClass}>{chat.content}</div>
                  </div>
                </Fragment>
              );
            } else {
              messageBoxClass += " justify-start my-1"; // 상대방은 왼쪽
              messageClass += " bg-white";
              return (
                <Fragment key={chat.chatId}>
                  <div className="text-xs ml-1 text-left">{chat.userId}</div>
                  <div className={messageBoxClass}>
                    <div className={messageClass}>{chat.content}</div>
                    <div className="text-xs ml-1">{formattedDate}</div>
                  </div>
                </Fragment>
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
      </div>
    );
  };

  export default Chat;
