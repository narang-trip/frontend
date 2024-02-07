import { useDispatch, useSelector } from "react-redux";
import Schedule from "./Schedule";
import TimeLine from "./TimeLine";
import { useEffect, useRef } from "react";
import { timeActions } from "../../store/timeSlice";

const DayPlan = (props) => {
  const day = useSelector((state) => state.time);
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const lineCnt =
    (Number(day.endHour) - Number(day.startHour)) * 2 +
    (Number(day.endMinute) - Number(day.startMinute)) / 30;

  // console.log(props.data.list);

  useEffect(() => {
    console.log(divRef);
    const blackHeight = (divRef.current.scrollHeight - 32) / (lineCnt * 3);
    console.log(blackHeight);
    dispatch(timeActions.setHeight(blackHeight));
  }, [dispatch, lineCnt]);

  return (
    <div
      ref={divRef}
      className="relative bg-slate-400 h-full w-60 rounded-xl p-2 overflow-hidden"
    >
      {props.data.index} 일
      {props.data.list.map((data, index) => (
        <Schedule data={[index, props.data.index]} key={index} />
      ))}
      <div className="absolute pointer-events-none top-0 left-0 h-full w-full">
        <TimeLine Time={day} />
      </div>
    </div>
  );
};

export default DayPlan;
