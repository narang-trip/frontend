import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
// 회원 탈퇴 모달
const LeaveUserModal = (props) => {
  const modalBG = useRef("");

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70"
      onClick={props.onClose}
      ref={modalBG}
    >
      <div
        className="z-10 px-10 py-4 bg-white rounded-3xl w-96 h-82"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="font-spoqa">
          <div className="flex justify-end mr-1">
            <button
              className="mb-4 text-xl font-semibold hover:text-red-600"
              onClick={props.onClose}
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="my-5 text-lg font-bold">정말 탈퇴하시겠습니까?</div>
            <button className="p-2 mb-5 bg-red-200 bg-opacity-50 rounded-md ring-1 ring-red-300 hover:bg-opacity-100">탈퇴하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveUserModal;
