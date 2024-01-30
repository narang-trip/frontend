import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import TitleInput from "./TitleInput";
import ConceptSelect from "./ConceptSelect";
import DateRangePicker from "./DateRangePicker.jsx";
import FileUploadBox from "./FileUploadBox";
import PositionCheck from "./PositionCheck.jsx";

export default function TripWriteForm() {
  const [formData, setFormData] = useState({
    title: "",
    concept: "",
    img: "",
    startDate: "",
    endDate: "",
    dateRange: [],
    location: "",
    count: "",
    position: [],
    plan: "",
    description: "",
  });

  const navigate = useNavigate();

  // 값이 변할 때 추적하기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };
      console.log("Updated FormData:", updatedFormData); // Log updated form data
      return updatedFormData;
    });
  };

  const [dateRange, setDateRange] = useState([null, null]);
  // 기간 변할 때 추적하는 함수
  const handleDateChange = (range) => {
    setDateRange(range);
    setFormData((prev) => ({
      ...prev,
      startDate: range[0],
      endDate: range[1],
      DateRange: range,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }; // handleSubmit 끝

  const saveWrite = () => {
    console.log("저장완료");
  };

  const cancle = () => {
    console.log("취소");
  };

  return (
    <Fragment>
      <div className="text-left">
        <form onSubmit={handleSubmit}>
          <div className="px-8 py-4 mx-auto border rounded-3xl bg-stone-100 border-stone-200">
            <div className="grid grid-cols-3 gap-6 px-4">
              <div className="col-span-3">
                <p className="my-2 text-2xl font-bold text-center">
                  동행 글 작성하기
                </p>
              </div>
              <div className="flex flex-col justify-between col-span-2">
                <TitleInput value={formData.title} onChange={handleChange} />
                <ConceptSelect
                  value={formData.concept}
                  onChange={handleChange}
                />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">대표 사진</label>
                  <input type="file" className="w-2/3 text-xs"/>
                </div>
                <DateRangePicker
                  dateRange={dateRange}
                  onChange={handleDateChange}
                />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">여행 장소</label>
                </div>
                <PositionCheck
                  value={formData.position}
                  onChange={handleChange}
                />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">
                    여행 계획표
                  </label>
                </div>
              </div>
              <div>
                <div className="mt-3 h-2/5" >
                  <img src={`assets/airplain.jpg`} className="h-full"/>
                </div>
                <div className="mt-3 h-3/5">
                  <label className="text-sm font-medium">여행 설명</label>
                  <br/>
                  <textarea className="w-full text-xs resize-none h-4/5 p-1.5"/>
                </div>
              </div>
              <div className="flex justify-around col-start-2 mt-10 mb-5">
                <button
                  className="px-6 py-2 rounded-md text-stone-800 bg-stone-500 hover:text-stone-950"
                  onClick={saveWrite}
                >
                  저장
                </button>
                <button
                  className="px-6 py-2 rounded-md bg-stone-800 text-stone-50"
                  onClick={cancle}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
