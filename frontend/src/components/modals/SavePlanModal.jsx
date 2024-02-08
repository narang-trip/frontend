import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const SavePlanModal = (props) => {
  const modalBG = useRef(null);
  const state = useSelector((state) => state.schedule);
  const [title, setTitle] = useState();

  const savePlan = () => {
    console.log(title);
    console.log(title, JSON.stringify(state));
  };

  const onChange = (e) => {
    setTitle(e.target.value);
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
        <button className="" onClick={props.onClose}>
          x
        </button>
        <label>계획이름</label>
        <input
          type="text"
          value={title}
          onChange={onChange}
          placeholder="..."
        ></input>
        <button className="" onClick={savePlan}>
          저장하기
        </button>
      </div>
    </div>
  );
};

export default SavePlanModal;
