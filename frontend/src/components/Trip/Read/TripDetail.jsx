import { Fragment, useState, useEffect } from "react";
import { SlCalender, SlLocationPin, SlPeople, SlBadge } from "react-icons/sl";
import { useParams } from "react-router-dom";
import axios from "axios";

import ApplicationModal from "../../modals/ApplicationModal";
import { ModalPortal } from "../../modals/ModalPortal";
import DateFormatter from "../../DateFormatter";
import TripParticipantsInfo from "./TripParticipantsInfo";

export default function TripDetail() {
  const [isOpen, setIsOpen] = useState(false);

  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  // 모달 open
  const OpenApplicationModal = () => {
    setIsOpen(true);
  };

  // 모달 close
  const CloseApplicationModal = () => {
    setIsOpen(false);
  };

  // useEffect (여행 상세 정보 로딩)
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://i10a701.p.ssafy.io/api/trip/trip/${tripId}`
      );

      // 상세 정보 저장
      setTripDetails(response.data);
      console.log(response.data.participants.length);
      // 날짜 포맷 설정
      setDepartureDate(
        DateFormatter({ dateString: response.data.departureDate })
      );
      setReturnDate(DateFormatter({ dateString: response.data.returnDate }));
    } catch (error) {
      console.error("게시판 상세정보를 가져오는 중 에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tripId]);

  // useEffect (모달 열렸을 때 스크롤 막기)
  useEffect(() => {
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
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <div className="px-8 py-4 mx-auto">
            {tripDetails ? (
              <div>
                <img
                  src={tripDetails.tripImgUrl}
                  className="my-1 w-full h-[15rem]"
                />
                <p className="my-5 text-lg font-bold text-left">
                  {tripDetails.tripName}
                </p>
                <div>
                  <div className="mr-10 text-sm font-medium text-right text-stone-700">
                    조회수 : {tripDetails.viewCnt}
                  </div>
                </div>
                <div>
                  <p className="my-5 text-base font-bold text-left">
                    여행 일정
                  </p>
                  <div className="p-1 rounded bg-stone-100">
                    <div className="flex flex-row items-center my-3 text-sm">
                      <SlCalender className="mx-3 text-neutral-400" size="24" />
                      <div className="text-neutral-700">
                        {departureDate} ~ {returnDate}
                      </div>
                    </div>
                    <div className="flex flex-row items-center my-3 text-sm">
                      <SlLocationPin
                        className="mx-3 text-neutral-400"
                        size="24"
                      />
                      <div className="text-neutral-700">
                        {tripDetails.destination}
                      </div>
                    </div>
                    <div className="flex flex-row items-center my-3 text-sm">
                      <SlPeople className="mx-3 text-neutral-400" size="24" />
                      <div className="text-neutral-700">
                        {" "}
                        {tripDetails.participants.length} /{" "}
                        {tripDetails.tripParticipantsSize}{" "}
                      </div>
                    </div>
                    <div className="flex flex-row items-center my-3 text-sm">
                      <SlBadge className="mx-3 text-neutral-400" size="24" />
                      <div className="flex flex-wrap justify-between">
                        {tripDetails.tripRoles &&
                          tripDetails.tripRoles.map((role, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 m-0.5 text-sm font-medium rounded-full text-neutral-700 bg-stone-100 ring-1 ring-inset ring-stone-500"
                            >
                              {role}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="my-5 text-base font-bold text-left">
                    여행 소개
                  </p>
                  <div className="m-6 text-sm text-left text-wrap ">
                    {tripDetails.tripDesc}
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
            <button
              className="inline-flex px-3 py-2 text-sm font-medium text-indigo-700 rounded-md bg-indigo-50 ring-1 ring-inset ring-indigo-700/10"
              onClick={OpenApplicationModal}
            >
              신청하기
            </button>
            {isOpen && (
              <ModalPortal>
                <ApplicationModal
                  onClose={CloseApplicationModal}
                  data={tripDetails}
                />
              </ModalPortal>
            )}
          </div>
        </div>
        <div className="col-span-1">
          {tripDetails ? (
            <div>
              <p className="mt-5 mb-3 text-base font-bold">일정 정보</p>

              <p className="mb-3 text-base font-bold">여행 참여자 정보</p>
              <TripParticipantsInfo participants={tripDetails.participants} />
            </div>
          ) : (
            <div>loading 💦</div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
