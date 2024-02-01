import { Fragment } from "react";
import ReceiveRequestsInfo from "./ReceiveRequestsInfo";
import TripInfo from "./TripInfo";
export default function ReceivedRequests() {


  return (
    <Fragment>
      <h1>받은 요청 목록을 보여줍니다.</h1>
      <TripInfo/>
      <ReceiveRequestsInfo />
    </Fragment>
  );
}
