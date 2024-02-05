import { useRef } from "react";
import Select from "react-select";

const AddInfoModal = (props) => {
  const modalBG = useRef("");
  const positionList = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const Check = (e) => {
    console.log(e);
  };

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
        <div>
          {/* 추가정보작성 닫기 버튼 추가 */}
          <button className="" onClick={props.onClose}>
            x
          </button>
          <h3>추가 정보작성</h3>
          <form onSubmit={Check}>
            <div className="flex">
              <label>닉네임 :</label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                className="flex-1 py-1.5 pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                placeholder="..."
              />
            </div>

            <div className="flex">
              <label>S N S : </label>
              <input
                type="text"
                name="sns"
                id="sns"
                className="flex-1 py-1.5 pl-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                placeholder="..."
              />
            </div>

            <div className="flex-col">
              <label>선호 포지션</label>
              <Select
                isMulti
                name="positions"
                options={positionList}
                className="basic-multi-select"
                classNamePrefix="select"
              ></Select>
            </div>

            <div className="flex-col">
              <label>소개 한마디!</label>
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>

            <button type="submit">수정하기</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInfoModal;
