import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadTrip } from "../actions/trip";
import { useInView } from "react-intersection-observer";

const TripContainer = () => {
  const { tripList } = useSelector((state) => state.trip); // store에서 tripList를 가져옴
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (tripList.length === 0) {
      console.log("여행 포스팅 로딩");
      dispatch(loadTrip());
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    if (tripList.length !== 0 && inView) {
      console.log("첫 로딩 이후 무한 스크롤");
      dispatch(loadTrip());
    }
  }, [inView]);

  console.log(tripList);

  return (
    <Fragment>
      <div className="w-3 p-4">
        355
      </div>
      {tripList.map((item) => (
        <li key={item}>{item}</li>
      ))}
      <div ref={ref} />
    </Fragment>
  );
};

export default TripContainer;
// <li>부분은 trip 컴포넌트가 들어와야 할것으로 생각