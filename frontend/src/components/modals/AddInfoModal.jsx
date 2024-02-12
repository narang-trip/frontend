import { useRef, useState,useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const AddInfoModal = ({ userId, data, onClose }) => {
  const modalBG = useRef("");
  const positionList = [
    "비기너",
    "트레일블레이저",
    "멜로디메이커",
    "포토그래퍼",
    "네비게이터",
    "클린메이트",
    "로드레전드",
    "트렌드파인더",
    "힐링위버",
    "스타일리스트",
    "언어위자드",
    "푸드파이터",
  ];

  // 닉네임
  const [nickName, setNickName] = useState('');
  // 선호하는 포지션
  const [selectedPositions, setSelectedPositions] = useState([]);
  
  // 닉네임 변경
  const handleNickNameChange = (e) => {
    setNickName(e.target.value);
  };
  
  
  // 선호 포지션 변경
  const handleCheckboxChange = (position) => {
    setSelectedPositions((prevPositions) => {
      if (prevPositions.includes(position)) {
        // 만약 포지션이 이미 선택되어 있다면 제거
        return prevPositions.filter((pos) => pos !== position);
      } else if (prevPositions.length < 3) {
        // 3개 미만의 포지션이 선택되어 있다면 새로운 포지션 추가
        return [...prevPositions, position];
      }
      // 이미 3개의 포지션이 선택되어 있으면 더 이상 추가하지 않음
      return prevPositions;
    });
  };
  
  // 체크박스가 활성화 여부를 결정
  const isCheckboxDisabled = (position) => selectedPositions.length >= 3 && !selectedPositions.includes(position);
  
  
    const userData = {
      nickname: nickName,
      gender: data.gender,
      ageRange: data.ageRange,
      profile_url: data.profile_url,
      userRoles: selectedPositions
    };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    console.log(userData);
    try {
      const response = await axios.patch(
        `https://i10a701.p.ssafy.io/api/user/profile/${userId}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("요청 성공", response.data);

      // Close the modal after successful update
      onClose();
    } catch (error) {
      console.error("요청 실패", error);
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
          <p className="flex justify-center mb-5 text-base font-bold">정보 수정</p>
          <form onSubmit={handleSubmit}>
            <div className="flex m-2">
              <label className="flex items-center mr-2 text-sm font-bold">
                닉네임
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                onChange={handleNickNameChange}
                className="p-1 text-sm border rounded-md border-neutral-400"
                placeholder={data.nickname}
              />
            </div>

            <div className="m-2">
              <label className="mr-2 text-sm font-bold">
                선호 포지션(최대 3개 선택 가능)
              </label>
              <div className="flex flex-wrap justify-start border rounded-md border-neutral-400">
                {positionList.map((position) => (
                  <div key={position} className="flex items-center m-2 w-28">
                    <input
                      type="checkbox"
                      value={position}
                      onChange={() => handleCheckboxChange(position)}
                      disabled={isCheckboxDisabled(position)}
                    />
                    <label className="text-sm">{position}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="p-2 text-sm font-semibold text-blue-900 bg-blue-200 border border-blue-800 rounded-lg bg-opacity-35 ring-1"
                type="submit"
              >
                완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInfoModal;
