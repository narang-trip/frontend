import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import TripInfo from "./TripInfo";

const ReceivedRequests = () => {
  const [pageNo, setPageNo] = useState(0);
  const [tripData, setTripData] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0, // div태그가 보일 때 inView가 true로 설정
  });

  const getMyList = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://i10a701.p.ssafy.io/api/trip/trips?userId=3fa85f64-5717-4562-b3fc-2c963f66a123&pageNo=${pageNo}`
      );

      // 가져올 항목이 없으면 중단
      if (response.data.content.length === 0) {

        console.log("데이터 없음💢");
        return;
      }

      // 새로운 데이터를 기존 데이터에 추가
      setTripData((prevData) => [...prevData, ...response.data.content]); // 가져온 데이터를 상태로 설정
      // 페이지 번호 증가
      setPageNo((prevPageNo) => prevPageNo + 1);
    } catch (error) {
      console.error("내가 작성한 목록 가져오는 중 에러 발생 : error");
    }
  }, [pageNo]);


  // inView가 true일때 데이터를 가져옴
  useEffect(() => {
    if (inView) {
      console.log(`${pageNo} : 무한 스크롤 요청 🎃`);
      getMyList();
    }
  }, [inView]);

  return (
    <Fragment>
      <div>
        {tripData.map((trip, idx) => (
          <TripInfo tripData={trip} key={idx} />
        ))}
      </div>
      <div ref={ref}></div>
    </Fragment>
  );
};

export default ReceivedRequests;
