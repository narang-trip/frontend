import { useState, useEffect } from "react";
import { ModalPortal } from "./modals/ModalPortal";
import LoginModal from "./modals/LoginModal";

export default function UpperNavbar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <header className="flex justify-between p-4 bg-slate-100">
      <div>나랑</div>
      <div onClick={OpenLoginModal}>Login</div>
      {isOpen && (
        <ModalPortal>
          <LoginModal onClose={CloseLoginModal} />
        </ModalPortal>
      )}
    </header>
  );
}
