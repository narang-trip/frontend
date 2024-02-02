import { useState, useEffect } from "react";
import { ModalPortal } from "../modals/ModalPortal";
import MileageModal from "../modals/MileageModal";

const Mileage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const OpenMileage = () => {
    setIsOpen(true);
  };

  const CloseMileage = () => {
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

  console.log(props);
  return (
    <div className="h-1/3 shadow-xl p-3 border-black rounded-lg relative">
      보유마일리지 : {} pt
      <button className="absolute top-0 right-0" onClick={OpenMileage}>
        상세내역보기
      </button>
      {isOpen && (
        <ModalPortal>
          <MileageModal onClose={CloseMileage} />
        </ModalPortal>
      )}
    </div>
  );
};

export default Mileage;
