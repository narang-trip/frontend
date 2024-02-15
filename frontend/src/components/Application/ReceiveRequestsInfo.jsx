import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ReceiveRequestsInfo({ data, trip, updateReceivedData }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const userId = useSelector((state) => state.auth.userId);

   // 날짜 포맷
   const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  
  const handleAccept = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_TRIP_REQUEST_URI}/trip/join`,
        {
          tripId: trip.tripId,
          userId: data.senderId,
          alertId: data.id,
          userRoles: data.position
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }

      );
      
      // const response1 = await axios.patch(
      //   `${import.meta.env.VITE_ALERT_REQUEST_URI}/attend/${data.id}/ACCEPT`
      // );


      // 서버 응답을 이용해 필요한 작업 수행
      console.log("서버 응답:", response.data);

      // 성공한 경우 상태를 업데이트하여 렌더링을 다시 실행
      setIsAccepted(true);
      setIsRejected(false);
      await updateReceivedData();
    } catch (error) {
      // 오류 처리
      console.error("서버 응답 에러", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_TRIP_REQUEST_URI}/trip/reject`,
        {
          tripId: data.tripId,
          userId: data.senderId,
          usageId: data.usageId,
          alertId: data.id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("서버응답 : ", response.data);
      // const response1 = await axios.patch(
      //   `${import.meta.env.VITE_ALERT_REQUEST_URI}/attend/${data.id}/REJECT`
      // );

      // const response2 =  await axios.post(
      //   `${import.meta.env.VITE_PAYMENT_REQUEST_URI}/refundusage_id=${data.usageId}&departure_datetime=${formatDate(trip.departureDate)}`,
      // );

  

      // 성공한 경우 상태를 업데이트하여 렌더링을 다시 실행
      setIsAccepted(false);
      setIsRejected(true);
      await updateReceivedData();
    } catch (error) {
      // 오류 처리
      console.error("서버 응답 에러", error);
    }
  };

  // useEffect를 사용하여 데이터가 갱신될 때마다 수락, 거절 상태 초기화
  useEffect(() => {
    setIsAccepted(false);
    setIsRejected(false);
  }, [data]);

  return (
    <Fragment>
      <div className="flex flex-wrap justify-center w-full">
        <div className="flex flex-row justify-around w-9/12 m-2">
          <div className="grid h-24 grid-rows-2 p-2 border rounded-lg w-/12 border-stone-400">
            <div className="flex items-center justify-between mx-4 mb-2">
              <div>
                <img
                  className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="mx-3 text-sm">{data.senderName}</span>
              </div>
              <div className=" p-1.5 text-sm text-center flex ">
                {data.position &&
                  data.position.map((role, idx) => (
                    <span
                      className="p-1 border bg-neutral-100 rounded-xl border-neutral-100"
                      key={idx}
                    >
                      {role}{" "}
                    </span>
                  ))}
              </div>
            </div>
            <div className="p-2 mx-5 text-sm border rounded-xl border-slate-300">
              <p>{data.aspiration}</p>
            </div>
          </div>

          <div className="flex items-center">
            <button
              className="items-center px-6 py-3 mx-2 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20"
              onClick={handleAccept}
            >
              수락
            </button>
            <button
              className="items-center px-6 py-3 mx-2 text-xs font-medium text-red-700 rounded-md bg-red-50 ring-1 ring-inset ring-red-600/10"
              onClick={handleReject}
            >
              거절
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
