import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scheduleActions } from "../../store/scheduleSlice";

const PlanSummary = ({ plan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const day = JSON.parse(decodeURIComponent(window.atob(plan.planInfo))).time
    .totalDay;
  console.log("day : ", day);

  const goPlan = () => {
    dispatch(scheduleActions.setSchedule(plan));
    navigate(`/makeplan/${plan.planId}`);
  };

  return (
    <div
      className="flex text-xl w-full rounded-full py-1 bg-amber-100"
      onClick={goPlan}
    >
      <p className="w-1/6">{plan.planName}</p>
      <p className="w-1/2">{plan.planDesc}</p>
      <p className="w-1/6">
        {day - 1}박{day}일
      </p>
      <p className="w-1/6">{plan.lastModifiedDate}</p>
    </div>
  );
};

export default PlanSummary;
