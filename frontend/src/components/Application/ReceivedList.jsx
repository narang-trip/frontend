import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ReceiveRequestsInfo from "./ReceiveRequestsInfo";

export default function ReceivedList({ tripData }) {
  const [receivedData, setReceivedData] = useState(null);

  const decodePosition = (encodedPosition) => {
    try {
      const decodedPosition = JSON.parse(decodeURIComponent(window.atob(encodedPosition)));
      return decodedPosition;
    } catch (error) {
      console.error("오류 발생", error);
      return encodedPosition;
    }
  };

  const fetchRequestData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_ALERT_REQUEST_URI}/trip/${tripData.tripId}`
      );

      const decodedData = response.data.alertList.map((item) => ({
        ...item,
        position: decodePosition(item.position),
      }));

      setReceivedData(decodedData);
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