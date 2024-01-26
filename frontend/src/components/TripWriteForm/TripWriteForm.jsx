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
      DateRange: range, // Update formData.DateRange based on the selected date range
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }; // handleSubmit 끝

  const saveWrite = () => {};

  const back = () => {};

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
          <div className="container px-8 py-8 mx-auto border bg-stone-400 border-stone-700">
            <div className="flex flex-col flex-wrap ">
              <p className="mb-8 text-4xl text-center ">동행 글 작성하기</p>
              <TitleInput value={formData.title} onChange={handleChange} />
              <ConceptSelect value={formData.concept} onChange={handleChange} />
              <FileUploadBox />
              <DateRangePicker
                dateRange={dateRange}
                onChange={handleDateChange}
              />
              <div>
                <label>여행 장소</label>
              </div>
              <PositionCheck
                value={formData.position}
                onChange={handleChange}
              />
              <div>
                <label>여행 계획표</label>
              </div>
              <div>
                <label>여행 설명</label>
                <textarea/>
              </div>
              <div>
                <button
                  className="px-6 py-2 rounded-md text-stone-800 bg-stone-500 hover:text-stone-950"
                  onClick={saveWrite}
                >
                  저장
                </button>
                <button
                  className="px-6 py-2 rounded-md bg-stone-800 text-stone-50"
                  onClick={back}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
      </form>
    </Fragment>
  );
}
