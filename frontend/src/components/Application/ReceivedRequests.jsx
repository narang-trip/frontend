import { Fragment } from "react";
import TripInfo from "./TripInfo";
export default function ReceivedRequests() {
  return (
    <Fragment>
      <div className="h-screen">
        <TripInfo />
        <TripInfo />
        <TripInfo />
        <TripInfo />
        <TripInfo />
      </div>
    </Fragment>
  );
}
