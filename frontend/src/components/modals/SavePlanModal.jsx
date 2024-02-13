import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { scheduleActions } from "../../store/scheduleSlice";
import { useMemo } from "react";
import { useEffect } from "react";

const SavePlanModal = (props) => {
  const modalBG = useRef(null);
  const state = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);

  const savePlan = async () => {
    console.log(title, JSON.stringify(state));
    console.log(state);
    console.log(JSON.stringify(state));
    window.sessionStorage.setItem("plan", JSON.stringify(state));
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PLAN_REQUEST_URI}`,
        {
          title: title,
          plan: JSON.stringify(state),
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    props.onClose();
  };

  useMemo(() => {
    dispatch(scheduleActions.setTitle(title));
  }, [dispatch, title]);

  useEffect(() => {
    setTitle(state.title);
  }, [state.title]);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

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
