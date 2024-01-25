import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import FileUploadBox from "./FileUploadBox";

export default function WriteForm() {
  const [formData, setFormData] = useState({
    title: "",
    concept: "",
    img: "",
    startDate: "",
    endDate: "",
    DateRange: [],
    location: "",
    count: "",
    position: "",
    plan: "",
    description: "",
  });

  const navigate = useNavigate();

  // 값이 변할 때 추적하기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }; // handleSubmit 끝

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label>여행제목</label>
          <input
            type="text"
            name="title"
            placeholder="제목을 작성해주세요"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>여행 컨셉</label>
          <select
            name="concept"
            value={formData.concept}
            onChange={handleChange}
          >
            <option>빨강</option>
            <option>주황</option>
            <option>노랑</option>
            <option>초록</option>
            <option>파랑</option>
            <option>남색</option>
            <option>보라</option>
          </select>
        </div>
        <FileUploadBox />
        <div>
          <label>여행 기간</label>
          <DatePicker
            selectsRange={true}
            startDate={formData.startDate}
            endDate={formData.endDate}
            onChange={(update) => {
              setFormData.DateRange(update);
            }}
            isClearable={true}
            dateFormat="yy/MM/dd"
          />
        </div>
      </form>
    </Fragment>
  );
}
