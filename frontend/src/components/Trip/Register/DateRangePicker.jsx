import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

export default function DateRangePicker({ dateRange, onChange }) {
  return (
    <div className="w-full my-2">
      <label className="mr-10 text-sm font-medium">여행 기간</label>
      <DatePicker
       showIcon
        locale={ko}
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={onChange}
        isClearable={true}
        dateFormat="yy/MM/dd"
        className="text-xs"
      />
    </div>
  );
}