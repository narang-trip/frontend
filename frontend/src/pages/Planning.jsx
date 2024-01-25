import Plan from "../components/Plan";
import Map from "../components/GoogleMap/Map";
export default function PlanningPage() {
  return (
    <>
      <div className="text-2xl text-gray">계획짜는 페이지</div>
      <Plan />
      <Map />
    </>
  );
}
