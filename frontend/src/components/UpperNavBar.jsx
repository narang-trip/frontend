import { useState } from "react";
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
