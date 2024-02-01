import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const userId = "조예진"

const ChatPage = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const chatRoomId = e.target.elements.chatRoomId.value;
    const nickname = e.target.elements.nickname.value;

    const dynamicPath = `chat/chatRoomId=${chatRoomId}?nickname=${nickname}`;

    navigate(dynamicPath);
  };

  const eventSource = new EventSource(`https://i10a701.p.ssafy.io/api/message/subscribe/${userId}`);

    eventSource.onmessage = function (event) {
        const eventData = JSON.parse(event.data);
        // 서버에서 전송한 데이터를 처리
        console.log('Received data:', eventData.message);
    };

    eventSource.onerror = function (error) {
        console.error('Error with SSE connection:', error);
        eventSource.close();  // 에러 발생 시 연결 종료
    };

  return (
    <div className="">
      <div className="">
        <label>
          <b>채팅방</b>
        </label>
      </div>

      <form onSubmit={submitHandler}>
        <label htmlFor="chatRoomId">룸아이디</label>
        <br />
        <input
          type="number"
          id="chatRoomId"
          name="chatRoomId"
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <hr />
        <label htmlFor="chatRoomId">닉네임</label>
        <br />
        <input
          type="text"
          name="nickname"
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <hr />
        <Button type="submit">참여하기</Button>
      </form>
    </div>
  );
};

export default ChatPage;
