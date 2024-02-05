import { Fragment, useState, useEffect } from "react";
import { SlCalender, SlLocationPin, SlPeople, SlBadge } from "react-icons/sl";
import ApplicationModal from "../../modals/ApplicationModal";
import { ModalPortal } from "../../modals/ModalPortal";
import { useParams } from "react-router-dom";
import axios from "axios";
import DateFormatter from "../../DateFormatter";

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

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `https://i10a701.p.ssafy.io/api/trip/${tripId}`
        );
        setTripDetails(response.data);
        console.log(response.data);

        setDepartureDate(
          DateFormatter({ dateString: response.data.departureDate })
        );
        setReturnDate(DateFormatter({ dateString: response.data.returnDate }));
      } catch (error) {
        console.error("게시판 상세정보를 가져오는 중 에러 발생:", error);
      }
    };

    fetchTripDetails();
  }, [tripId]);

  return (
    <Fragment>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <div className="px-8 py-4 mx-auto">
            {tripDetails ? (
              <div>
                <img
                  src={`../assets/airplain.jpg`}
                  className="my-1 w-full h-[15rem]"
                />
                <p className="my-5 text-lg font-bold text-left">
                  {tripDetails.tripName}
                </p>
                <div>
                  <div className="mr-10 text-sm font-medium text-right text-stone-700">
                    조회수 : 0
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
                      <div className="text-neutral-700"> 2 / 4 </div>
                    </div>
                    <div className="flex flex-row items-center my-3 text-sm">
                      <SlBadge className="mx-3 text-neutral-400" size="24" />
                      <div className="flex flex-wrap justify-between">
                        {tripDetails.participants
                          .filter((participant) => participant.role !== null)
                          .map((participant, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 m-0.5 text-sm font-medium rounded-full text-neutral-700 bg-stone-100 ring-1 ring-inset ring-stone-500"
                            >
                              {participant.role}
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
            <button className="inline-flex px-3 py-2 text-sm font-medium text-indigo-700 rounded-md bg-indigo-50 ring-1 ring-inset ring-indigo-700/10" onClick={OpenApplicationModal}>
              신청하기
            </button>
            {isOpen && (
              <ModalPortal>
                <ApplicationModal
                  onClose={CloseApplicationModal}
                  positions={tripDetails.participants
                    .filter((participant) => participant.role !== null)
                    .map((participant, index) => (
                      <span key={index}>{participant.role}</span>
                    ))}
                />
              </ModalPortal>
            )}
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </Fragment>
  );
}
