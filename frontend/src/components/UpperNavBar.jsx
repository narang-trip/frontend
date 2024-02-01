import { useState, useEffect } from "react";
import { ModalPortal } from "./modals/ModalPortal";
import LoginModal from "./modals/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/auth-slice";
import Dropdown from "./UpNavDropdown";

export default function UpperNavbar() {
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
     <header className="sticky top-0 flex justify-between w-full p-4 bg-slate-100">
      <div>나랑</div>
      {code === "" && <div onClick={OpenLoginModal}>Login</div>}
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
}
