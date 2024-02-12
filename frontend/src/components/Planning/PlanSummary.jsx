import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scheduleActions } from "../../store/scheduleSlice";

const PlanSummary = ({ plan }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goPlan = () => {
    console.log(plan);
    dispatch(scheduleActions.setSchedule(plan));
    navigate("/makeplan", { plan });
  };

  return (
    <div className="w-full rounded-1" onClick={goPlan}>
      내용 내용
    </div>
  );
};

export default PlanSummary;
