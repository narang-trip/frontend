import { Fragment, useState, useEffect } from "react";
import axios from "axios";

export default function ReceiveRequestsInfo({ data, trip }) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const handleAccept = async () => {
    try {
      const response1 = await axios.patch(
        `https://i10a701.p.ssafy.io/api/message/alert/attend/${data.id}/ACCEPT`
      );

      const response2 = await axios.post(
        `https://i10a701.p.ssafy.io/api/payment/use?user_id=44cf8d0d-a5f4-3fb8-b7c9-2d3d77c679b5&price=${trip.tripDeposit}&trip_id=${trip.tripId}`
      );

      console.log(response2.data);
      
      // 서버 응답을 이용해 필요한 작업 수행
      console.log("서버 응답:", response1.data);

      // 성공한 경우 상태를 업데이트하여 렌더링을 다시 실행
      setIsAccepted(true);
      setIsRejected(false);
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
                <span className="mx-3 text-sm">{data.senderId}</span>
              </div>
              <div className=" p-1.5 text-sm text-center flex ">
                {data &&
                  data.position.map((role, idx) => (
                    <span
                      className="p-1 border bg-neutral-100 rounded-xl border-neutral-100"
                      key={idx}
                    >
                      {role}{" "}
                    </span>
                  ))}
              </div>
              <div className="flex">
                <span className="items-center px-1.5 py-2 mx-1 text-xs font-medium text-gray-700 rounded-full bg-gray-50 ring-2 ring-inset ring-gray-600/20">
                  뱃지1
                </span>
           
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
            <button className="items-center px-6 py-3 mx-2 text-xs font-medium text-red-700 rounded-md bg-red-50 ring-1 ring-inset ring-red-600/10">
              거절
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
