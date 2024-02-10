import { useEffect, useState, Fragment } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import colors from 'tailwindcss/colors';
import { GoDotFill } from "react-icons/go";

import "../../css/Calendar.css";
import { useSelector } from "react-redux";

const dayList = [
  "2024-02-10",
  "2024-02-21",
  "2024-02-02",
  "2024-02-14",
  "2024-02-27",
];
// 체크용 더미데이터 실제로는 axios.get을 통해 api통신으로 받아올 예정
const CalendarCp = () => {
  const { conceptColor } = useSelector((state) => state.concept);
  const dynamicColor = colors[conceptColor] ? colors[conceptColor][400] : colors.gray[400];
  const [value, setValue] = useState(new Date());
  const [activeDate, setActiveDate] = useState(null); // 클릭한 날짜를 저장할 상태
  const navigate = useNavigate();
  const addContent = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];
    const formattedDate = moment(date).format("YYYY-MM-DD")


    if (dayList.includes(formattedDate)) {
      // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가

      // const circleStyle = {
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   width: '100%',
      //   height: '100%',
      //   borderRadius: '50%', // 동그라미 형태
      //   border: '2px solid red', // 적용할 테두리 색상과 두께
      // }

      contents.push(
        <div className={`text-${conceptColor}-400`} key={formattedDate}>
          <GoDotFill />
        </div>);
    }
    return <div key={formattedDate}>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };


  const onClickDayHandler = (value, event) => {
    setActiveDate(moment(value).format("YYYY-MM-DD")); // 클릭한 날짜를 상태에 저장
    if (event.target.textContent.includes("😂")) {
      console.log("hi");
      navigate("/search");
    }
  };

  const tileClassName = ({ date, view }) => {
    // 월 보기에서만 스타일 적용
    if (view === 'month') {
      const dayOfWeek = date.getDay();
      const formattedDate = moment(date).format("YYYY-MM-DD");
      let additionalClass = "";
      if (activeDate === formattedDate) {
        additionalClass += ' active';
      }
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        additionalClass += ' weekend-day' // 주말 날짜에 적용할 클래스
      }

      // if (dayList.includes(formattedDate)) {
      //   additionalClass += ' circle-day'
      // }
      return additionalClass
    }
  };

  useEffect(() => {
    setActiveDate(moment(value).format("YYYY-MM-DD"));
    const style = document.createElement('style');
    style.innerHTML = `.react-calendar__navigation { color: ${dynamicColor}; }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [dynamicColor]);


  return (
    <div className="w-full flex justify-center items-center">
      <Calendar
        calendarType="gregory"
        onChange={setValue}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        minDate={new Date(2024, 0, 1)}
        tileContent={addContent}
        showNeighboringMonth={false}
        onClickDay={onClickDayHandler}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarCp;
