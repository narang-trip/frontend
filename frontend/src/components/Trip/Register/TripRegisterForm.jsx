import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModalPortal } from "../../modals/ModalPortal.jsx";

import TitleInput from "./TitleInput.jsx";
import ConceptSelect from "./ConceptSelect.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
import FileUploadBox from "./FileUploadBox.jsx";
import PositionCheck from "./PositionCheck.jsx";
import LocationModal from "../../modals/LocationModal.jsx";
import GenderRadio from "./GenderRadio.jsx";

export default function TripWriteForm() {
  const [board, setBoard] = useState({
    title: "",
    concept: "",
    img: "",
    location: "",
    count: 0,
    position: [],
    plan: "",
    description: "",
    gender: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // 값이 변할 때 추적하기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
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

  // 모달 open
  const OpenLocaitonModal = () => {
    setIsOpen(true);
  };

  // 모달 close
  const CloseLocationModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터 저장 또는 데이터 저장을 위한 액션 디스패치
    console.log("데이터 저장 중:", board);

    // 저장 후 이동할 페이지로 이동
    navigate("/detail");
  }; // handleSubmit 끝

  useEffect(() => {
    // 모달이 열렸을 때 스크롤 막기 위함
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Fragment>
      <div className="text-left">
        <form onSubmit={handleSubmit}>
          <div className="px-8 py-4 mx-auto border rounded-xl bg-stone-100 border-stone-200">
            <div className="grid grid-cols-3 gap-6 px-4">
              <div className="col-span-3">
                <p className="my-2 text-2xl font-bold text-center">
                  동행 글 작성하기
                </p>
              </div>
              <div className="flex flex-col justify-between col-span-2">
                <TitleInput value={board.title} onChange={handleChange} />
                <ConceptSelect value={board.concept} onChange={handleChange} />
                <DateRangePicker
                  dateRange={dateRange}
                  onChange={handleDateChange}
                />
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">여행 장소</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="장소를 선택해주세요"
                    value={board.location}
                    onClick={OpenLocaitonModal}
                    className="border border-stone-200 bg-stone-0 p-1.5 w-2/3 text-gray-900 placeholder:text-gray-300 text-xs"
                  ></input>
                  {isOpen && (
                    <ModalPortal>
                      <LocationModal onClose={CloseLocationModal} />
                    </ModalPortal>
                  )}
                </div>
                <div className="w-full my-2">
                  <label className="mr-10 text-sm font-medium">모집 인원</label>
                  <input
                    type="number"
                    name="count"
                    placeholder="모집 인원을 입력해주세요"
                    value={board.count}
                    onChange={handleChange}
                    required
                    className="border border-stone-200 bg-stone-0 p-1.5 w-2/3 text-gray-900 placeholder:text-gray-300 text-xs"
                  />
                </div>
                <GenderRadio value={board.gender} onChange={handleChange} />
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
              <div className="flex flex-col justify-between col-span-1">
                <div className="h-2/5">
                  <img src={`assets/airplain.jpg`} className="my-1 h-3/4" />
                  <input type="file" className="text-xs" />
                </div>
                <div className="h-3/5">
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
