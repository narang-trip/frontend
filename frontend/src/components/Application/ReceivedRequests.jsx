import { Fragment, useCallback, useEffect, useState, } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import TripInfo from "./TripInfo";

const ReceivedRequests = () => {
  const [pageNo, setPageNo] = useState(0);
  const [tripData, setTripData] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  // const userId = "44cf8d0d-a5f4-3fb8-b7c9-2d3d77c679b5"; // 사용자 ID

  const navigate = useNavigate();

  const getMyList = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TRIP_REQUEST_URI}/recruit`,
        {
          userId: userId,
          pageNo: pageNo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
      getMyList();
  }, [pageNo]);



  return (
    <Fragment>
      <div>
        {tripData &&
          tripData.map((trip, idx) => {
            console.log(`idx : ${idx}`)
            console.table(trip);
            return <TripInfo tripData={trip} key={idx} />
          })}
      </div>
    </Fragment>
  );
};

export default ReceivedRequests;
