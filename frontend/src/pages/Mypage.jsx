import { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

import MypageCalendar from "../components/Mypage/MypageCalendar";
import UserInfo from "../components/Mypage/UserInfo";
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
      <div className="grid w-full h-screen grid-cols-9 gap-5">
        <div className="col-span-6">
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
          <SmallPlan dates={[startDate, endDate]} />
        </div>
        <div className="col-span-3">
          <div className="flex flex-col">
            <UserInfo />
            <Mileage />
            <MyBadge />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Mypage;
