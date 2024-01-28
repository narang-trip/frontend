import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

export default function DateRangePicker({ dateRange, onChange }) {
  return (
    <div>
      <label>여행 기간</label>
      <DatePicker
        locale={ko}
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={onChange}
        isClearable={true}
        dateFormat="yy/MM/dd"
      />
    </div>
  );
}