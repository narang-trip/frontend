import { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function SentRequests() {
  const [sentData, setSentData] = useState(null);
  const [selectedType, setSelectedType] = useState("ALL");

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

  const handleCancel = async (item) => {
    try {
      // 예약금 환불이 필요한 경우
      if (item.alertType === "ACCEPT") {
        // 여기에 예약금 환불 로직 추가
        await refundDeposit(item.tripId);
      }

      // 취소에 대한 요청을 보내거나 삭제 로직을 구현합니다.
      await axios.delete(
        `https://i10a701.p.ssafy.io/api/message/alert/${item.id}`
      );

      // 삭제 요청이 성공하면 해당 알림을 새로고침 없이 제거합니다.
      setSentData((prevSentData) =>
        prevSentData.filter((i) => i.id !== item.id)
      );
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  // 예약금 환불 로직
  const refundDeposit = async (tripId) => {
    // 여기에 예약금 환불에 대한 서버 요청 로직을 추가
    try {
      await axios.post(`https://i10a701.p.ssafy.io/api/refund`, { tripId });
      console.log("예약금 환불 성공");
    } catch (error) {
      console.error("Error refunding deposit:", error);
    }
  };

  // 요청중, 수락, 거절에 따라서 색깔 구분
  const getColorClass = (alertType) => {
    switch (alertType) {
      case "REQUEST":
        return "text-blue-500";
      case "ACCEPT":
        return "text-green-500";
      case "REJECT":
        return "text-red-500";
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
          <div>
            <div className="flex justify-around mb-4">
              <button
                className={`p-3 text-sm rounded-full ${
                  selectedType === "ALL"
                    ? "text-neutral-700 font-extrabold transition ease-in-out scale-110 duration-200"
                    : "font-medium"
                }`}
                onClick={() => setSelectedType("ALL")}
              >
                ALL
              </button>
              <button
                className={`p-3 text-sm rounded-full ${
                  selectedType === "REQUEST"
                    ? "text-blue-700 font-extrabold transition ease-in-out scale-110 duration-200"
                    : "font-medium"
                }`}
                onClick={() =>
                  setSelectedType((prev) =>
                    prev === "REQUEST" ? "ALL" : "REQUEST"
                  )
                }
              >
                REQUEST
              </button>
              <button
                className={`p-3 text-sm rounded-full ${
                  selectedType === "ACCEPT"
                    ? "text-green-700 font-extrabold transition ease-in-out scale-110 duration-200"
                    : "font-medium"
                }`}
                onClick={() =>
                  setSelectedType((prev) =>
                    prev === "ACCEPT" ? "ALL" : "ACCEPT"
                  )
                }
              >
                ACCEPT
              </button>
              <button
                className={`p-3 text-sm rounded-full ${
                  selectedType === "REJECT"
                    ? "text-red-700 font-extrabold transition ease-in-out scale-110 duration-200"
                    : "font-medium"
                }`}
                onClick={() =>
                  setSelectedType((prev) =>
                    prev === "REJECT" ? "ALL" : "REJECT"
                  )
                }
              >
                REJECT
              </button>
            </div>
            {sentData &&
              sentData.map(
                (item, idx) =>
                  (selectedType === "ALL" ||
                    item.alertType === selectedType) && (
                    <div className="flex justify-between" key={idx}>
                      <div
                        className={`w-4/5 m-4 border border-black ${getColorClass(
                          item.alertType
                        )}`}
                      >
                        <p>{item.id}</p>
                        <p>{item.tripId}</p>
                        <p>{item.tripName}</p>
                        <p>{item.alertType}</p>
                      </div>

                      <button onClick={() => handleCancel(item)}>취소</button>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
