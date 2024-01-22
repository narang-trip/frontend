import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";

import "../../css/Calendar.css";
import CarroselRightSide from "./CarroselRightSide";

const dayList = [
  "2024-01-10",
  "2024-01-21",
  "2024-01-02",
  "2024-01-14",
  "2024-01-27",
];
// 체크용 더미데이터 실제로는 axios.get을 통해 api통신으로 받아올 예정
const CalendarCp = () => {
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const addContent = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    // date(각 날짜)가  리스트의 날짜와 일치하면 해당 컨텐츠(이모티콘) 추가
    if (dayList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
      contents.push(<Fragment key={moment(date).format("YYYY-MM-DD")}>😂</Fragment>);
    }
    return <div key={moment(date).format("YYYY-MM-DD")}>{contents}</div>; // 각 날짜마다 해당 요소가 들어감
  };

  const onClickDayHandler = (value, event) => {
    if (event.target.textContent.includes("😂")) {
      console.log("hi");
      navigate("/search");
    }
  };

  return (
    <div>
      <h1>{`현재 표시된 날짜 : ${moment(value).format("YYYY-MM-DD")}`}</h1>
      <Calendar
        calendarType="gregory"
        onChange={setValue}
        value={value}
        minDate={new Date(2024, 0, 1)}
        tileContent={addContent}
        onClickDay={onClickDayHandler}
      />
      <CarroselRightSide />
    </div>
  );
};

export default CalendarCp;
