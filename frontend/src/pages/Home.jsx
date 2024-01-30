import Button from "../ui/Button";
import Concept from "../components/Concept";
import TripList from "../components/TripList";

export default function HomePage() {
  return (
    <div>
      홈페이지입니다. 도커 테스트 중입니다.
      <img
        src="/assets/travelBanner.jpg"
        className="object-cover w-full h-40"
      />
      <Concept />
      <TripList />
    </div>
  );
}
