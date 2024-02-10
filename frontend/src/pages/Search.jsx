import { Fragment, useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import TripSummary from "../components/Trip/Read/TripSummary";

const SearchPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [tripData, setTripData] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0, // div태그가 보일 때 inView가 true로 설정
  });

  const getBoardList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TRIP_REQUEST_URI}/page/${pageNo}`
      );

      console.log(response.data);
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
      getBoardList();
    }
  }, [inView]);

  return (
    <Fragment>
      <div className="grid grid-cols-6">
        <div className="col-span-5">
          <div className="flex flex-wrap justify-center">
            {tripData.map((trip, idx) => (
              <TripSummary trip={trip} key={idx} />
            ))}
          </div>
          <div ref={ref}></div>
        </div>
        <div className="col-span-1">
          <div>날짜</div>
          <div>장소(대륙)</div>
          <div>컨셉</div>
          <div>포지션</div>
          <div>인원</div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchPage;
