import { useRef, useState } from "react";
import { ModalPortal } from "./ModalPortal";
import BuyMileageModal from "./BuyMileage";

const MileageModal = (props) => {
  const modalBG = useRef("");
  const [option, setOption] = useState("use");

  const [isOpen, setIsOpen] = useState(false);
  const OpenPayment = () => {
    setIsOpen(true);
  };

  const ClosePayment = () => {
    setIsOpen(false);
  };

  const Change = (e) => {
    setOption(e);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
      onClick={props.onClose}
      ref={modalBG}
    >
      <div
        className="z-10 px-10 py-4 bg-white rounded-3xl w-96 h-82"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="" onClick={props.onClose}>
          x
        </button>
        <>
          마일리지
          <button onClick={() => Change("use")}>사용내역</button>
          <button onClick={() => Change("get")}>획득내역</button>
          {option === "use" && <div>사용내역</div>}
          {option === "get" && <div>획득내역</div>}
          <button onClick={OpenPayment}>결제하기</button>
          {isOpen && (
            <ModalPortal>
              <BuyMileageModal onClose={ClosePayment} />
            </ModalPortal>
          )}
        </>
      </div>
    </div>
  );
};

export default MileageModal;
