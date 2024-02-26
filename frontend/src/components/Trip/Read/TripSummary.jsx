import { Fragment, useState, useEffect, useMemo } from "react";
import {
  SlCalender,
  SlLocationPin,
  SlInfo,
  SlPeople,
  SlEye,
} from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import Resizer from 'react-image-file-resizer';

import DateFormatter from "../../DateFormatter";

const TripSummary = ({ trip }) => {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [optimizedImageUrl, setOptimizedImageUrl] = useState("");  

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

  const tripDestination = useMemo(() => {
    const tripDestinationString = `${trip.continent}, ${trip.country}, ${trip.city}`;
    return tripDestinationString.length > 18
      ? tripDestinationString.slice(0, 17) + "..."
      : tripDestinationString;
  }, [trip.continent, trip.country, trip.city]);

  const tripDescShortened = useMemo(() => {
    return trip.tripDesc.length > 18
      ? trip.tripDesc.slice(0, 17) + "..."
      : trip.tripDesc;
  }, [trip.tripDesc]);

  useEffect(() => {
    setDepartureDate(DateFormatter({ dateString: trip.departureDate }));
    setReturnDate(DateFormatter({ dateString: trip.returnDate }));

    // 이미지 최적화
    fetch(trip.tripImgUrl)
      .then((response) => response.blob())
      .then((blob) => {
        Resizer.imageFileResizer(
          blob,
          240, // 넓이
          192, // 높이
          'JPEG', // 포맷
          100, // 품질 (0-100)
          0, // 회전 각도 (0-360)
          (uri) => {
            setOptimizedImageUrl(uri);
          },
          'base64', // 반환 형식 ('base64', 'blob', 'file')
          300, // 최대 파일 크기 (KB)
          100 // 최대 이미지 높이 (px)
        );
      })
      .catch((error) => {
        console.error("이미지 로딩 오류", error);
      });
  }, [trip.departureDate, trip.returnDate, trip.tripImgUrl]);


  return (
    <Fragment>
      <div className="w-[30%] rounded-l">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleViewClick}
          className="flex px-3 py-4 mx-3 my-4 align-top border rounded-3xl bg-stone-200 border-stone-400"
        >
          <div className="grid">
            <div className="relative overflow-hidden group rounded-3xl">
              <img
                src={optimizedImageUrl}
                alt="tripThumbnail"
                className="mb-2 transition-transform duration-300 ease-in-out transform scale-100 rounded-3xl group-hover:scale-125"
              />
              {isHovered && (
                <div className="absolute inset-0 flex flex-col items-end justify-end bg-black text-neutral-800 bg-opacity-20">
                  <div className="flex flex-row items-center my-3 mr-4 text-sm font-semibold">
                    <SlPeople className="mx-3" size="16" />
                    <p className="text-sm">
                      {" "}
                      {trip.tripCurrParticipantsSize} /{" "}
                      {trip.tripMaxParticipantsSize}{" "}
                    </p>
                    <SlEye className="mx-3" size="16" />
                    <p className="text-sm">{trip.viewCnt}</p>
                  </div>
                </div>
              )}
            </div>
            <div>
            <div className="flex flex-row items-center my-1.5 text-sm">
                <p className="text-xs font-semibold ml-7">
                  {trip.tripName}
                </p>
              </div>
              <div className="flex flex-row items-center my-1.5 text-sm">
                <SlCalender className="mx-2 " size="16" />
                <p className="text-xs">
                  {departureDate} ~ {returnDate}
                </p>
              </div>
              <div className="flex flex-row items-center my-1.5 text-sm">
                <SlLocationPin className="mx-2 " size="16" />
                <p className="text-xs">{tripDestination}</p>
              </div>
              <div className="flex flex-row items-center my-1.5 text-sm">
                <SlInfo className="mx-2 " size="16" />
                <p className="inline-flex flex-wrap items-start text-xs text-start">
                  {tripDescShortened}
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </Fragment>
  );
};
export default TripSummary;
