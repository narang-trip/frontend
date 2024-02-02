import { Fragment, useState, useEffect } from "react";
import { SlCalender, SlLocationPin, SlPeople, SlBadge } from "react-icons/sl";
import ApplicationModal from "../modals/ApplicationModal";
import { ModalPortal } from "../modals/ModalPortal";

export default function TripDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [positions, setPositions] = useState([
    "역할1",
    "역할2",
    "역할3",
    "역할4",
    "역할5",
    "역할6",
    "역할7",
    "역할8",
  ]);

  // 모달 open
  const OpenApplicationModal = () => {
    setIsOpen(true);
  };

  // 모달 close
  const CloseApplicationModal = () => {
    setIsOpen(false);
  };

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
      <div className="px-8 py-4 mx-auto">
        <div>
          <p className="my-5 text-lg font-bold text-left">
            2월 중순부터 2박 3일로 같이 런던 여행 가실 분
          </p>
          <div>
            <div className="mr-10 text-sm font-medium text-right text-stone-700">
              조회수 : 0
            </div>
          </div>
          <div>
            <p className="my-5 text-base font-bold text-left">여행 일정</p>
            <div className="p-1 rounded bg-stone-100">
              <div className="flex flex-row items-center my-3 text-sm">
                <SlCalender className="mx-3 text-neutral-400" size="24" />
                <div className="text-neutral-700">
                  {" "}
                  2024.02.01 ~ 2024.02.06{" "}
                </div>
              </div>
              <div className="flex flex-row items-center my-3 text-sm">
                <SlLocationPin className="mx-3 text-neutral-400" size="24" />
                <div className="text-neutral-700">유럽, 영국, 런던</div>
              </div>
              <div className="flex flex-row items-center my-3 text-sm">
                <SlPeople className="mx-3 text-neutral-400" size="24" />
                <div className="text-neutral-700"> 2 / 4 </div>
              </div>
              <div className="flex flex-row items-center my-3 text-sm">
                <SlBadge className="mx-3 text-neutral-400" size="24" />
                <div className="flex flex-wrap justify-between">
                  {positions.map((position, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 m-0.5 text-sm font-medium rounded-full text-neutral-700 bg-stone-100 ring-1 ring-inset ring-stone-500"
                    >
                      {position}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="my-5 text-base font-bold text-left">여행 소개</p>
            <div className="m-6 text-sm text-left text-wrap ">
              여행 너무 같이 가고 싶어요. 제가 계획 다 짜놨으니까, 포지션만
              맞춰서 와주시면 돼요. 
              <br />
              맛난거 많이 먹고 행복한 시간 같이 보낼
              사람들 구합니다.
            </div>
          </div>
        </div>
        <div onClick={OpenApplicationModal}>신청하기</div>
        {isOpen && (
          <ModalPortal>
            <ApplicationModal
              onClose={CloseApplicationModal}
              positions={positions}
            />
          </ModalPortal>
        )}
      </div>
    </Fragment>
  );
}
