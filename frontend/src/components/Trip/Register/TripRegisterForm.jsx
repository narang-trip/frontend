import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import TitleInput from "./TitleInput.jsx";
import ConceptSelect from "./ConceptSelect.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
import FileUploadBox from "./FileUploadBox.jsx";
import PositionCheck from "./PositionCheck.jsx";

export default function TripWriteForm() {
  const [board, setBoard] = useState({
    title: "",
    concept: "",
    img: "",
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
    console.log(name, value); // 콘솔에 출력
    setBoard((board) => ({ ...board, [name]: value }));
  };

  const [dateRange, setDateRange] = useState([null, null]);
  // 기간 변할 때 추적하는 함수
  const handleDateChange = (range) => {
    setDateRange(range);
    setBoard((board) => ({
      ...board,
      startDate: range[0],
      endDate: range[1],
      dateRange: range,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터 저장 또는 데이터 저장을 위한 액션 디스패치
    console.log("데이터 저장 중:", board);

    // 저장 후 이동할 페이지로 이동
    navigate("/detail");
  }; // handleSubmit 끝

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
                <TitleInput value={board.title} onChange={handleChange} />
                <ConceptSelect value={board.concept} onChange={handleChange} />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">대표 사진</label>
                  <input type="file" className="w-2/3 text-xs" />
                </div>
                <DateRangePicker
                  dateRange={dateRange}
                  onChange={handleDateChange}
                />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">여행 장소</label>
                </div>
                <PositionCheck
                  value={board.position}
                  onChange={(positions) =>
                    setBoard((prev) => ({ ...prev, position: positions }))
                  }
                />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">
                    여행 계획표
                  </label>
                </div>
              </div>
              <div>
                <div className="mt-3 h-2/5">
                  <img src={`assets/airplain.jpg`} className="h-full" />
                </div>
                <div className="mt-3 h-3/5">
                  <label className="text-sm font-medium">여행 설명</label>
                  <br />
                  <textarea
                    value={board.description}
                    onChange={handleChange}
                    className="w-full text-xs resize-none h-4/5 p-1.5"
                    name="description"
                  />
                </div>
              </div>
              <div className="flex justify-around col-start-2 mt-10 mb-5">
                <button className="px-6 py-2 rounded-md text-stone-800 bg-stone-500 hover:text-stone-950">
                  저장
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
