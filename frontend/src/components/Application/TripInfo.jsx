import { Fragment, useState } from "react";
import { SlCalender, SlLocationPin, SlPeople, SlBadge } from "react-icons/sl";
import { RiArrowDropDownLine } from "react-icons/ri";
import ReceiveRequestsInfo from "./ReceiveRequestsInfo";

export default function TripInfo() {
  // 내가 작성한 글 목록 -> 드롭다운 버튼으로 신청자 목록 확인 가능하도록

  // true면 해당 글의 신청목록 보여주고, false면 닫음
  const [viewOpen, setViewOpen] = useState(false);

  const [positions, setPositions] = useState([
    "역할1",
    "역할2",
    "역할3",
    "역할4",
  ]);

  const handleViewClick = () => {
    setViewOpen(!viewOpen);
  };

  return (
    <Fragment>
      <div className="w-full text-center rounded-l">
        <ul>
          <button
            onClick={handleViewClick}
            className="w-8/12 px-4 py-4 mx-auto my-2 border rounded-3xl bg-stone-200 border-stone-400"
          >
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <img src={`assets/airplain.jpg`} className="rounded-3xl" />
              </div>
              <div className="col-span-2">
                <p className="my-1.5 text-sm font-bold text-center">
                  2월 중순부터 2박 3일로 같이 런던 여행 가실 분
                </p>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlCalender className="mx-3 " size="24" />
                  <div> 2024.02.01 ~ 2024.02.06 </div>
                </div>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlLocationPin className="mx-3 " size="24" />
                  <div>유럽, 영국, 런던</div>
                </div>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlPeople className="mx-3" size="24" />
                  <div> 2 / 4 </div>
                </div>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlBadge className="mx-3 " size="24" />
                  <div className="flex flex-wrap justify-between">
                    {positions.map((position, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 m-0.5 text-sm font-medium rounded-full bg-stone-100 ring-1 ring-inset ring-stone-500"
                      >
                        {position}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              viewOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {viewOpen && <ReceiveRequestsInfo />}
          </div>
        </ul>
      </div>
    </Fragment>
  );
}
