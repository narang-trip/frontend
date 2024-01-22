import Button from "../ui/Button";
import Concept from "../components/Concept";
import TripList from "../components/TripList";

export default function HomePage() {
  return (
    <div>
      <div className="text-3xl text-red-500 text-center">홈페이지</div>
      <img
        src="/assets/travelBanner.jpg"
        className="object-cover w-full h-40"
      />
      <Concept />
      <TripList />
    </div>
  );
}
