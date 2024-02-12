import { Fragment, useState, useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import { ko } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Checkbox from "../ui/CheckBox";
import TripSummary from "../components/Trip/Read/TripSummary";

const SearchPage = () => {
  const conceptList = ["낭만", "건축", "모험", "자유", "쇼핑", "휴양", "핫플"];
  const continents = [
    "동아시아",
    "동남아시아",
    "중앙아시아",
    "서남아시아",
    "유럽",
    "오세아니아",
    "아프리카",
    "북아메리카",
    "남아메리카",
  ];
  const positionList = [
    "비기너",
    "트레일블레이저",
    "멜로디메이커",
    "포토그래퍼",
    "네비게이터",
    "클린메이트",
    "로드레전드",
    "트렌드파인더",
    "힐링위버",
    "스타일리스트",
    "언어위자드",
    "푸드파이터",
  ];

  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedConcepts, setSelectedConcepts] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [participantsSize, setParticipantsSize] = useState(1); // Default to 1 person

  const [pageNo, setPageNo] = useState(0);
  const [tripData, setTripData] = useState([]);

  const { ref, inView } = useInView({
    threshold: 0, // div태그가 보일 때 inView가 true로 설정
  });

  // 날짜 변경
  const handleDateChange = (range) => {
    setDateRange(range);
    setStartDate(dateRange[0]);
    setEndDate(dateRange[1]);
  };

  // 인원 변경
  const handleParticipantsSize = (event) => {
    setParticipantsSize(parseInt(event.target.value, 10));
  };

  // 대륙 체크박스 변경 핸들러
  const handleContinentChange = (continent) => {
    const newSelectedContinents = selectedContinents.includes(continent)
      ? selectedContinents.filter((c) => c !== continent)
      : [...selectedContinents, continent];

    setSelectedContinents(newSelectedContinents);
  };

  // 컨셉 체크박스 변경 핸들러
  const handleConceptChange = (concept) => {
    const newSelectedConcepts = selectedConcepts.includes(concept)
      ? selectedConcepts.filter((c) => c !== concept)
      : [...selectedConcepts, concept];

    setSelectedConcepts(newSelectedConcepts);
  };

  // 포지션 체크박스 변경 핸들러
  const handlePositionChange = (position) => {
    const newSelectedPositions = selectedPositions.includes(position)
      ? selectedPositions.filter((p) => p !== position)
      : [...selectedPositions, position];

    setSelectedPositions(newSelectedPositions);
  };

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
      <div className="grid grid-cols-10">
        <div className="col-span-8">
          <div className="flex flex-wrap justify-center">
            {tripData.map((trip, idx) => (
              <TripSummary trip={trip} key={idx} />
            ))}
          </div>
          <div ref={ref}></div>
        </div>
        <div className="col-span-2">
          <div className="flex justify-around mb-2 itmes-center">
            <div className="mr-1">날짜</div>
            <DatePicker
              locale={ko}
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={handleDateChange}
              dateFormat="yy/MM/dd"
              className="p-1 text-sm border rounded-sm w-44 border-neutral-300 text-neutral-700"
            />
          </div>
          <div className="w-full my-3 border-2 border-neutral-300"/>
          <div className="flex items-center justify-around mb-2">
            <div className="mr-1">인원</div>
            <select
              value={participantsSize}
              onChange={handleParticipantsSize}
              className="p-1 text-sm border rounded-sm w-44 border-neutral-300 text-neutral-700"
            >
              {[...Array(12).keys()].map((value) => (
                <option key={value} value={value + 1}>
                  {value + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full my-3 border-2 border-neutral-300"/>
          <div>장소(대륙)</div>
          <div className="flex flex-col items-start p-1 text-neutral-700">
            {continents.map((continent) => (
              <Checkbox
                key={continent}
                label={continent}
                checked={selectedContinents.includes(continent)}
                onChange={() => handleContinentChange(continent)}
  
              />
            ))}
          </div>
          <div className="w-full my-3 border-2 border-neutral-300"/>
          <div>컨셉</div>
          <div className="flex flex-col items-start p-1 text-neutral-700">
            {conceptList.map((concept) => (
              <Checkbox
                key={concept}
                label={concept}
                checked={selectedConcepts.includes(concept)}
                onChange={() => handleConceptChange(concept)}
              />
            ))}
          </div>
          <div className="w-full my-3 border-2 border-neutral-300"/>
          <div>포지션</div>
          <div className="flex flex-col items-start p-1 text-neutral-700">
            {positionList.map((position) => (
              <Checkbox
                key={position}
                label={position}
                checked={selectedPositions.includes(position)}
                onChange={() => handlePositionChange(position)}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchPage;
