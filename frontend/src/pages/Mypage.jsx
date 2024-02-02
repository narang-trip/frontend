import MypageCalendar from "../components/Mypage/MypageCalendar";
import { useState } from "react";
import UserInfo from "../components/Mypage/UserInfo";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import SmallPlan from "../components/Mypage/SmallPlan";
import Mileage from "../components/Mypage/Mileage";

const Mypage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="h-2/5 p-4 flex flex-row space-x-2">
        {/* <MypageCalendar /> */}
        <div className="w-3/5">
          <DatePicker
            locale={ko}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            todayButton="now"
            monthsShown={2}
            inline
          />
        </div>
        <UserInfo />
      </div>
      <div className="h-3/5 p-4 flex flex-row space-x-2">
        <SmallPlan dates={[startDate, endDate]} />
        <div className="w-2/5 flex flex-col">
          <Mileage />
          뱃지 보여주기
          <div className="h-2/3 shadow-xl p-3 border-black rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
