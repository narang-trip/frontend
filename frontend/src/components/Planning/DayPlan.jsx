import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { scheduleActions } from "../../store/scheduleSlice";

import Schedule from "./Schedule";
import TimeLine from "./TimeLine";

const DayPlan = (props) => {
  const list = useSelector((state) => state.schedule).list;
  const divRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(scheduleActions.setBlackHeight(divRef.current.scrollHeight - 32));
  }, [dispatch]);

  return (
    <div ref={divRef} className="relative bg-slate-400 h-full w-60 rounded-xl p-2 overflow-hidden">
      {props.index + 1} 일
      {list[props.index].map((data, index) => (
        <Schedule data={{ dayIdx: props.index, scheduleIdx: index }} key={index} />
      ))}
      <div className="absolute pointer-events-none top-0 left-0 h-full w-full">
        <TimeLine />
      </div>
    </div>
  );
};

export default DayPlan;
