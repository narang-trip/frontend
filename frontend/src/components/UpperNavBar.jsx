import { useState, useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

import { ModalPortal } from "./modals/ModalPortal";
import Dropdown from "./UpNavDropdown";
import LoginModal from "./modals/LoginModal";
import Button from '../ui/Button'
import { useNavigate } from "react-router";

const UpperNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const code = useSelector((state) => state.auth.code);
  console.log(code);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  }
  const OpenLoginModal = () => {
    setIsOpen(true);
  };

  const CloseLoginModal = () => {
    setIsOpen(false);
  };

  const Logout = () => {
    dispatch(authActions.Logout());
  };
  useEffect(() => {
    // 모달이 열렸을 때 스크롤 막기 위함
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const clickHandler = (name) => {
    dispatch(authActions.Login({code, userId: name}))
    console.log(`${name} 로그인 됐습니다.`);
    console.log("---------------------------------");
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(
      `https://i10a701.p.ssafy.io/api/message/alert/subscribe/${name}`,
      {
        heartbeatTimeout: 3600000,
      }
    );
    
    eventSource.addEventListener("sse", (event) => {
      const { data: receivedConnectData } = event;
      console.log(receivedConnectData);
      if (receivedConnectData === "SSE 연결이 완료되었습니다.") {
        // "SSE connection has been completed."
        console.log("SSE CONNECTED");
      } else {
        console.log(event);
      }
    });
    eventSource.onerror = function(event) {
      console.error("SSE 에러 발생:", event);
    };
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full p-4 bg-stone-100">
      <div className="ml-5">
        <img src="/narang_logo.png" className="w-11 h-11 hover:cursor-pointer" onClick={navigateHome} alt="Home" />
      </div>
      <Button onClick={() => clickHandler("노세희")}>노세희 로그인</Button>
      <Button onClick={() => clickHandler("조용환")}>조용환 로그인</Button>
      {code === "" && (
        <button onClick={OpenLoginModal} className="mr-5 hover:font-semibold">
          Login
        </button>
      )}
      {code !== "" && (
        <div className="flex justify-between space-x-4">
          <div>🔔</div>
          <div>User</div>
          <Dropdown Logout={Logout} />
        </div>
      )}
      {isOpen && (
        <ModalPortal>
          <LoginModal onClose={CloseLoginModal} />
        </ModalPortal>
      )}
    </header>
  );
};

export default UpperNavbar;
