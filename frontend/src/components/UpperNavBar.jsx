import { useState, useEffect } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router";

import { ModalPortal } from "./modals/ModalPortal";
import Dropdown from "./UpNavDropdown";
import LoginModal from "./modals/LoginModal";
import Button from "../ui/Button";
import { conceptTemaBannerColorObject } from "../data/concepts";
import axios from "axios";
import { Link } from "react-router-dom";
import TalkBubble from "../ui/TalkBubble";

const AlertAnimation = ({ color }) => {
  return (
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}
        style={{ right: -22, top: "-8px" }}
      ></span>
      <span
        className={`absolute inline-flex rounded-full h-3 w-3 ${color}`}
        style={{ right: -22, top: "-8px" }}
      ></span>
    </span>
  );
};

const UpperNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [alertAmount, setAlertAmount] = useState(0);
  const [alertContent, setAlertContent] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { concept } = useSelector((state) => state.concept);
  const conceptColorClass = conceptTemaBannerColorObject[concept];
  let token = useSelector((state) => state.auth.token);
  let sessionToken = window.sessionStorage.getItem("token");

  useEffect(() => {
    if (sessionToken !== null) {
      token = sessionToken;
      const EventSource = EventSourcePolyfill || NativeEventSource;
      const eventSource = new EventSource(
        `https://i10a701.p.ssafy.io/api/message/alert/subscribe/${token}`,
        {
          heartbeatTimeout: 3600000,
        }
      );

      eventSource.addEventListener("sse", (event) => {
        const { data: receivedConnectData } = event;
        if (receivedConnectData === `EventStream Created. [userId=${token}]`) {
          console.log("SSE CONNECTED");
          setAlertAnimation();
          setAlertContent(`현재 알림이 ${alertAmount}개 와 있습니다.`);
        } else {
          const data = JSON.parse(receivedConnectData);
          setAlertAnimation();
          setAlertContent(makeAlertContent(data));
        }
      });
      eventSource.onerror = function (event) {
        console.error("SSE 에러 발생:", event);
      };
    }
    console.log(token);
  }, [token]);

  const navigateHome = () => {
    navigate("/");
  };
  const OpenLoginModal = () => {
    setIsOpen(true);
  };

  const CloseLoginModal = () => {
    setIsOpen(false);
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
    window.sessionStorage.setItem("token", name);
    dispatch(authActions.Login({ token: name }));
    getAlertData(name);
    console.log(`${name} 로그인 됐습니다.`);
    console.log("---------------------------------");
  };

  const getAlertData = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_ALERT_REQUEST_URI}/list/${userId}`
      );
      setAlertAmount(res.data.alertList.length);
      console.log(res.data.alertList);
    } catch (error) {
      console.error(error);
    }
  };

  const setAlertAnimation = () => {
    setIsVisible(true);
    setAlertAmount((prevData) => [prevData + 1]);
    setTimeout(() => setIsVisible(false), 4500);
  };

  const makeAlertContent = (event) => {
    switch (event.alertType) {
      case "REQUEST":
        return `${event.senderName}님이 ${event.tripName}에 ${event.position} 포지션으로 참여를 희망합니다`;
      case "ACCEPT":
        return `${event.senderName}님이 ${event.tripName}의 참여를 허락했습니다.`;
      case "REFUSE":
        return `${event.tripName}의 참여가 거절당했습니다.`;
      default:
        return "알 수 없는 알림입니다.";
    }
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full p-4 bg-stone-100">
      <div className="ml-5">
        <img
          src="/narang_logo.png"
          className="w-11 h-11 hover:cursor-pointer"
          onClick={navigateHome}
          alt="Home"
        />
      </div>
      <Button onClick={() => clickHandler("노세희")}>노세희 로그인</Button>
      <Button onClick={() => clickHandler("조용환")}>조용환 로그인</Button>
      {sessionToken === null && (
        <button onClick={OpenLoginModal} className="mr-5 hover:font-semibold">
          Login
        </button>
      )}
      {sessionToken !== null && (
        <div className="flex justify-between space-x-4 relative">
          <Link to="/applicantList" className="relative flex items-center">
            {alertAmount > 0 && <AlertAnimation color={conceptColorClass} />}
            🔔
          </Link>
          <TalkBubble content={alertContent} isVisible={isVisible} />
          <Dropdown />
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
