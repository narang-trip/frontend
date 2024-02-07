import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import TripSummary from "./TripSummary";

const BoardList = () => {
  const [tripData, setTripData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const endOfListRef = useRef();

  const getBoardList = async () => {
    try {
      const response = await axios.get(
        `https://i10a701.p.ssafy.io/api/trip/page/{pageNo}?pageNo=${pageNo}`
      );
      console.log(response.data.content);

      // 여행 summary 추가
      setTripData((prevData) => [...prevData, ...response.data.content]);
      // 다음 페이지로 증가
      // setPageNo((prevPageNo) => prevPageNo + 1);
    } catch (error) {
      console.error("게시판 목록을 가져오는 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      endOfListRef.current &&
      endOfListRef.current.getBoundingClientRect().bottom <=
        window.innerHeight &&
      !loading
    ) {
      getBoardList();
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 로딩
    getBoardList();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h2>여행 목록</h2>
      <div className="flex flex-wrap justify-center">
        {tripData.map((trip) => (
          <TripSummary trip={trip} key={trip.id} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div ref={endOfListRef}></div>
    </div>
  );
};

export default BoardList;
