import { Fragment, useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import axios from "axios";

import TripSummaryMini from "../Trip/Read/TripSummaryMini";

const SmallPlan = (props) => {
  const [pageNo, setPageNo] = useState(0);
  const [tripData, setTripData] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const { ref, inView } = useInView({
    threshold: 0, // div태그가 보일 때 inView가 true로 설정
  });

  const getMyList = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TRIP_REQUEST_URI}/trips`,
        {
          userId: userId,
          tripPageNo: pageNo,
        }
      );

      // 가져올 항목이 없으면 중단
      if (response.data.content.length === 0) {
        return;
      }

      // 새로운 데이터를 기존 데이터에 추가
      setTripData((prevData) => [...prevData, ...response.data.content]);

      // 페이지 번호 증가
      setPageNo((prevPageNo) => prevPageNo + 1);
    } catch (error) {
      console.error("여행 목록을 가져오는 중 에러 발생:", error);
    }
  }, [pageNo]);

  // inView가 true일때 데이터를 가져옴
  useEffect(() => {
    if (inView) {
      console.log(`${pageNo} : 무한 스크롤 요청 🎃`);
      getMyList();
    }
  }, [inView]);

  const dates = props.dates;
  console.log(dates[1]);
  const plans = [];
  if (dates[1] !== null) {
    plans.push([], []);
  }
  // 날짜 포함하면
  return (
    <Fragment>
      <div className="flex flex-wrap justify-center">
        {tripData.map((trip, idx) => (
          <TripSummaryMini trip={trip} key={idx} />
        ))}
      </div>
      <div ref={ref}></div>
    </Fragment>
  );
};

export default SmallPlan;
