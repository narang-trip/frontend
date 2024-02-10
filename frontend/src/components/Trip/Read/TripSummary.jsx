import { Fragment, useState, useEffect } from "react";
import {
  SlCalender,
  SlLocationPin,
  SlInfo,
  SlPeople,
  SlEye,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import DateFormatter from "../../DateFormatter";

const TripSummary = ({ trip }) => {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/detail/${trip.tripId}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    setDepartureDate(DateFormatter({ dateString: trip.departureDate }));
    setReturnDate(DateFormatter({ dateString: trip.returnDate }));
  }, [trip.departureDate, trip.returnDate]);

  return (
    <Fragment>
      <div className="w-4/12 rounded-l">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleViewClick}
          className="px-3 py-4 mx-3 my-4 border h-[24rem] flex align-top rounded-3xl bg-stone-200 border-stone-400"
        >
          <div className="grid">
            <div className="relative overflow-hidden group rounded-3xl">
              <img
                src={trip.tripImgUrl}
                alt="tripThumbnail"
                className="mb-2 transition-transform duration-300 ease-in-out transform scale-100 w-[18rem] h-[13rem] rounded-3xl group-hover:scale-125"
              />
              {isHovered && (
                <div className="absolute inset-0 flex flex-col items-end justify-end bg-black text-neutral-800 bg-opacity-20">
                  <div className="flex flex-row items-center my-3 mr-4 text-sm font-semibold">
                    <SlPeople className="mx-3" size="16" />
                    <p className="text-sm">2 / {trip.tripParticipantsSize} </p>
                    <SlEye className="mx-3" size="16" />
                    <p className="text-sm">{trip.viewCnt}</p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-row items-center my-1.5 text-sm">
                <SlCalender className="mx-2 " size="24" />
                <p className="text-xs">
                  {departureDate} ~ {returnDate}
                </p>
              </div>
              <div className="flex flex-row items-center my-1.5 text-sm">
                <SlLocationPin className="mx-2 " size="24" />
                <p className="text-xs">{trip.destination}</p>
              </div>
              <div className="flex flex-row items-center my-1.5 text-sm">
                <SlInfo className="mx-2 " size="24" />
                <p className="text-xs">{trip.tripDesc}</p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </Fragment>
  );
};
export default TripSummary;
