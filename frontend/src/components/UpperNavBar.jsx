import { useState, useEffect } from "react";
import { ModalPortal } from "./modals/ModalPortal";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/authSlice";

import LoginModal from "./modals/LoginModal";
import Dropdown from "./UpNavDropdown";

const UpperNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const code = useSelector((state) => state.auth.code);
  console.log(code);
  const dispatch = useDispatch();

  const OpenLoginModal = () => {
    setIsOpen(true);
  };

  const CloseLoginModal = () => {
    setIsOpen(false);
  };

  const Logout = () => {
    dispatch(authAction.Logout());
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

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full p-4 bg-stone-100">
      <div className="ml-5">
        <img src="/narang_logo.png" alt="나랑 이미지" className="w-11 h-11" />
      </div>
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
