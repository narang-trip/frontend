import { Fragment, useState } from "react";
import { SlCalender, SlLocationPin, SlPeople, SlBadge } from "react-icons/sl";

const TripSummary = ({trip}) => {

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
      <div className="w-3/12 text-center rounded-l">
          <button
            onClick={handleViewClick}
            className="px-3 py-4 mx-3 my-3 border rounded-3xl bg-stone-200 border-stone-400"
          >
            <div className="grid" >
              <div>
                <img src={`assets/airplain.jpg`} className="rounded-3xl" />
              </div>
              <div >
                <p className="my-1.5 text-sm font-bold text-center">
                 {trip.tripName}
                </p>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlCalender className="mx-3 " size="24" />
                  <p className="text-xs"> {trip.departureDate} </p>
                </div>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlLocationPin className="mx-3 " size="24" />
                  <p className="text-xs">{trip.destination}</p>
                </div>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlPeople className="mx-3" size="24" />
                  <p className="text-xs"> 2 / 4 </p>
                </div>
                <div className="flex flex-row items-center my-1.5 text-sm">
                  <SlBadge className="mx-3 " size="24" />
                  <div className="flex flex-wrap justify-between">
                    {positions.map((position, index) => (
                      <p
                        key={index}
                        className="inline-flex items-center px-2 py-1 m-0.5 text-xs font-medium rounded-full bg-stone-100 ring-1 ring-inset ring-stone-500"
                      >
                        {position}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>
      </div>
    </Fragment>
  );
}
export default TripSummary;