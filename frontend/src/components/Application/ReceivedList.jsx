import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ReceiveRequestsInfo from "./ReceiveRequestsInfo";

export default function ReceivedList({ tripData }) {
  const [receivedData, setReceivedData] = useState(null);

  const fetchRequestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ALERT_REQUEST_URI}/trip/${tripData.tripId}`
      );

      setReceivedData(response.data.alertList);
      console.log(receivedData);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, [tripData.tripId]);

  return (
    <Fragment>
      {receivedData &&
        receivedData.map((data, index) => (
          <ReceiveRequestsInfo key={index} data={data} trip={tripData} />
        ))}
    </Fragment>
  );
}
