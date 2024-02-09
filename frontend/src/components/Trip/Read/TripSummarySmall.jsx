import { Fragment, useState, useEffect, useMemo } from "react";
import {
  SlCalender,
  SlLocationPin,
  SlInfo,
  SlPeople,
  SlEye,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import DateFormatter from "../../DateFormatter";

const TripSummarySmall = ({ trip }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const { departureDate, returnDate } = useMemo(
    () => ({
      departureDate: DateFormatter({ dateString: trip.departureDate }),
      returnDate: DateFormatter({ dateString: trip.returnDate }),
    }),
    [trip.departureDate, trip.returnDate]
  );

  const handleViewClick = () => {
    navigate(`/detail/${trip.tripId}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="w-full rounded-lg h-[45%]">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleViewClick}
        className="px-3 py-4 mx-3 my-4 border flex align-top rounded-3xl bg-stone-200 border-stone-400 h-full"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="relative overflow-hidden group rounded-3xl col-span-1">
            <img
              src={`assets/airplain.jpg`}
              alt="tripThumbnail"
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform scale-100 rounded-3xl group-hover:scale-125 "
            />
            {isHovered && (
              <div className="absolute inset-0 flex flex-col items-end justify-end bg-black text-neutral-800 bg-opacity-20">
                <div className="flex flex-row items-center my-1 mr-2 text-xs font-semibold" style={{ whiteSpace: 'nowrap', minWidth: '100px' }}>
                  <SlPeople className="mx-1" size="12" />
                  <p className="text-xs">2 / {trip.tripParticipantsSize}</p>
                  <SlEye className="mx-1" size="12" />
                  <p className="text-xs">{trip.viewCnt}</p>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-1">
            <div className="flex flex-row items-center my-3 text-sm">
              <SlCalender className="mx-2 " size="24" />
              <p className="text-xs">
                {departureDate} ~ {returnDate}
              </p>
            </div>
            <div className="flex flex-row items-center my-3 text-sm">
              <SlLocationPin className="mx-2 text-4xl" />
              <p className="text-xs">{trip.destination}</p>
            </div>
            <div className="flex flex-row items-center my-3 text-sm">
              <SlInfo className="mx-2 " size="24" />
              <p className="text-xs">{trip.tripDesc}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
export default TripSummarySmall;
