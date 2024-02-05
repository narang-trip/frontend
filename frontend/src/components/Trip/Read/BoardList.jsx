import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TripSummary from './TripSummary';

const BoardList = () => {
  const [tripData, setTripData] = useState([]);

  const getBoardList = async () => {
    try {
      const response = await axios.get('https://i10a701.p.ssafy.io/api/trip/available');
      setTripData(response.data); // 받아온 데이터를 상태로 설정
    } catch (error) {
      console.error('게시판 목록을 가져오는 중 에러 발생:', error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 함수 호출
    getBoardList();
  }, []); // 의존성 배열이 비어있으므로 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h2>여행 목록</h2>
      <div className='flex flex-wrap justify-center'>
      {tripData.map((trip) => (
        <TripSummary trip={trip} key={trip.id} />
      ))}
      </div>
    </div>
  );
};

export default BoardList;