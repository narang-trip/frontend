import { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function SentRequests() {
  const [sentData, setSentData] = useState(null);

  const fetchSentData = async () => {
    try {
      const response = await axios.get(
        `https://i10a701.p.ssafy.io/api/message/alert/list/send/노세희`
      );

      setSentData(response.data.alertList);
      console.log(response.data.alertList);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  // 요청중, 수락, 거절에 따라서 색깔 구분
  const getColorClass = (alertType) => {
    switch (alertType) {
      case "REQUEST":
        return "text-blue-400";
      case "ACCEPT":
        return "text-green-400";
      case "REJECT":
        return "text-red-400";
      default:
        return "";
    }
  };

  useEffect(() => {
    fetchSentData();
  }, []);

  return (
    <Fragment>
      <div className="flex justify-center">
        <div className="w-10/12 text-center">
          {sentData &&
            sentData.map((item, idx) => (
              <div
                className={`m-4 border border-black ${getColorClass(
                  item.alertType
                )}`}
                key={idx}
              >
                <p>{item.id}</p>
                <p>{item.tripId}</p>
                <p>{item.tripName}</p>
                <p>{item.alertType}</p>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
}
