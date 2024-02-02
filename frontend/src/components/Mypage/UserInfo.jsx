import { useState, useEffect } from "react";
import { ModalPortal } from "../modals/ModalPortal";
import AddInfoModal from "../modals/AddInfoModal";

const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Openmodify = () => {
    setIsOpen(true);
  };

  const Closemodify = () => {
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
    <div className="relative justify-center w-2/5 p-3 border-black rounded-lg shadow-xl">
      <img className="rounded-full" alt="프로필 이미지" src="" />
      <table className="table-fixed">
        <tbody>
          <tr>
            <th>선호 포지션</th>
            <td>정보에서 받아오기</td>
          </tr>
          <tr>
            <th>생일</th>
            <td>xxxx.xx.xx</td>
          </tr>
          <tr>
            <th>SNS</th>
            <td>x, fb, insta, etc...</td>
          </tr>
        </tbody>
      </table>
      소개글
      <article className="text-wrap ...">
        <h3>Beloved Manhattan soup stand closes</h3>
        <p>New Yorkers are facing the winter chill...</p>
      </article>
      <div className="absolute bottom-0 right-0 ">
        <button onClick={Openmodify}>정보 수정</button>
        <button>회원 탈퇴</button>
      </div>
      {isOpen && (
        <ModalPortal>
          <AddInfoModal onClose={Closemodify} />
        </ModalPortal>
      )}
    </div>
  );
};

export default UserInfo;
