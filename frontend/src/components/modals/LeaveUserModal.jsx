import { useRef } from "react";

// 회원 탈퇴 모달
const LeaveUserModal = (props) => {
  const modalBG = useRef("");

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-gray-500 bg-opacity-70"
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
          정말로 탈퇴하시겠습니까?
          <button>탈퇴하기</button>
        </>
      </div>
    </div>
  );
};

export default LeaveUserModal;
