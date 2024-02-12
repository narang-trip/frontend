import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

import { ModalPortal } from "./ModalPortal";
import BuyMileageModal from "./BuyMileage";

const MileageModal = ({ onClose }) => {
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

  const user_id = "44cf8d0d-a5f4-3fb8-b7c9-2d3d77c679b5"; // 사용자 ID

  // 충전 금액
  const [price, setPrice] = useState(0);

  const handleCharge = async () => {
    try {
      const url = `http://localhost:3000/Mypage`;

      const response = await axios.post(
        `https://i10a701.p.ssafy.io/api/payment/ready?user_id=${user_id}&price=${price}&return_url=${url}`
      );

      console.log(response.data.next_redirect_pc_url);
      // 서버 응답에서 리다이렉션 URL을 가져옴
      const redirectUrl = response.data.next_redirect_pc_url;

      // 리다이렉션 수행
      window.location.href = redirectUrl;

      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-gray-500 bg-opacity-70"
      onClick={onClose}
      ref={modalBG}
    >
      <div
        className="z-10 px-10 py-4 bg-white rounded-3xl w-96 h-82"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className=" font-spoqa">
          <div className="flex justify-end mr-1">
            <button
              className="mb-4 text-xl font-semibold hover:text-red-600"
              onClick={onClose}
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex m-2">
            <label className="flex items-center mr-2 text-sm font-bold">
            💸 충전금액
            </label>
            <input
              type="number"
              placeholder="숫자만 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-1 border rounded-md border-neutral-400"
            />
          </div>
          {/* <button onClick={() => Change("use")}>사용내역</button>
          <button onClick={() => Change("get")}>획득내역</button>
          {option === "use" && <div>사용내역</div>}
          {option === "get" && <div>획득내역</div>} */}
          <button className="p-1 border border-black rounded-lg" onClick={handleCharge}>결제하기</button>
          {isOpen && (
            <ModalPortal>
              <BuyMileageModal onClose={ClosePayment} />
            </ModalPortal>
          )}
        </div>
      </div>
    </div>
  );
};

export default MileageModal;
