import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";

import "../css/Calendar.css";

export default function CalendarCp() {
  const [value, setValue] = useState(new Date());
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (moment(value).format("YYYY-MM-DD") === "2024-01-08") {
  //     navigate("/Planning");
  //   }
  // }, [value, navigate]); 
  // // 계획이 있는 달력의 날짜를 고르게 되면 넘어가는 것을 계획
  return (
    <div>
      <h1>{`현재 표시된 날짜 : ${moment(value).format("YYYY-MM-DD")}`}</h1>
      <Calendar onChange={setValue} value={value} />;
    </div>
  );
}
