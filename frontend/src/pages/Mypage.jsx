import MypageCalendar from "../components/Mypage/MypageCalendar";
import { useState,Fragment } from "react";
import UserInfo from "../components/Mypage/UserInfo";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import SmallPlan from "../components/Mypage/SmallPlan";
import Mileage from "../components/Mypage/Mileage";
import MyBadge from "../components/Mypage/MyBadge";

const Mypage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <Fragment>
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row p-4 space-x-2 h-2/5">
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
      <div className="flex flex-row p-4 space-x-2 h-3/5">
        <SmallPlan dates={[startDate, endDate]} />
        <div className="flex flex-col w-2/5">
          <Mileage />
          <MyBadge />
        </div>
      </div>
    </div>
    </Fragment>
  );
};

export default Mypage;
