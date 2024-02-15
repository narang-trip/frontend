import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scheduleActions } from "../../store/scheduleSlice";

const PlanSummary = ({ plan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const planInfo = JSON.parse(decodeURIComponent(window.atob(plan.planInfo)));
  const day = planInfo.time.totalDay;
  console.log("day : ", day);

  const goPlan = () => {
    dispatch(scheduleActions.setSchedule(planInfo));
    navigate(`/makeplan/${plan.planId}`);
  };

  return (
    <div
      className="relative w-1/3 h-48 rounded-lg bg-yellow-100 p-2 shadow-lg hover:shadow-xl hover:shadow-orange-200"
      onClick={goPlan}
    >
      <div className="flex flex-col w-full border border-yellow-200 h-full rounded-lg bg-white">
        <div className="flex justify-center">
          <div className="w-1/2 h-6 rounded-b-md border-b-8 border-yellow-200  bg-yellow-100"></div>
        </div>
        <div className="flex-col">
          <p className="text-2xl justify-center pt-1">{plan.planName}</p>
          <p className="text-sm justify-center pt-4">{plan.planDesc}</p>
          <p className="text-sm justify-center pt-1">
            {day - 1}박{day}일
          </p>
          <p className="absolute text-sm bottom-2 right-2">
            {plan.lastModifiedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSummary;
