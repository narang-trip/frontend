import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import CarouselTemplete from "../ui/Carousel";

const LoadingDiv = () => {
  return <div className="flex flex-col justify-center items-center h-full">
    <ClipLoader />
  </div>
}

const NoDataMsg = ({ conceptColor }) => {
  return <div className="flex flex-col justify-center items-center h-full">
    <p className={`text-lg font-semibold animate-bounce text-${conceptColor}-400`}>모집글을 작성해 보세요</p>
  </div>
}
const TripListContent = () => {
  const { concept, conceptColor } = useSelector((state) => state.concept);
  const [isLoading, setIsLoading] = useState(false);
  const [conceptTripList, setConceptTripList] = useState([]);

  useEffect(() => {
    getConceptTrip(concept)
  }, [concept])

  const getConceptTrip = async (concept) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://i10a701.p.ssafy.io/api/trip/trips/banner?tripConcept=${concept}`)
      setConceptTripList(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }



  if (isLoading) {
    return <LoadingDiv />;
  } // 로딩중이면

  if (conceptTripList.length === 0) {
    return <NoDataMsg conceptColor={conceptColor} />;
  } //데이터 없으면

  return <CarouselTemplete list={conceptTripList} />; 
  //둘다 아니면
}

const TripList = () => {
  return (
    <div className="w-full h-[50vh] m-auto">
      <TripListContent />
    </div>
  );
};
export default TripList
