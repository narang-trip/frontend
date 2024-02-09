import { useSelector } from "react-redux";
import CarouselTemplete from "../ui/Carousel";
import { useEffect, useState } from "react";
import axios from "axios";
const TripList = () => {
  const {concept} = useSelector((state) => state.concept);
  console.log(concept);
  const [conceptTripList, setConceptTripList] = useState([]); 

  useEffect(() => {
    getConceptTrip(concept)
  }, [concept])

  const getConceptTrip = async (concept) => {
    try {
      const res = await axios.get(`https://i10a701.p.ssafy.io/api/trip/trips/banner?tripConcept=${concept}`)
      const data = res.data;
      setConceptTripList(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full m-auto">
      <CarouselTemplete list={conceptTripList} />
    </div>
  );
}

export default TripList
