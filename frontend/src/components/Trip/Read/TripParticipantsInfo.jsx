import { Fragment } from "react";
import { SlSpeech } from "react-icons/sl";

export default function TripParticipantsInfo({ participants }) {
  return (
    <Fragment>
      <div>
        {participants &&
          participants.map((participant, idx) => (
            <div
              key={idx}
              className="grid grid-rows-2 px-2 pt-1 mb-2 border rounded-lg border-neutral-200"
            >
              <div className="row-span-1 mx-2 my-2">
                <div className="grid grid-cols-5">
                  <div className="col-span-1">
                    {" "}
                    <img
                      className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col flex-wrap justify-center col-span-4">
                    {/* <p className="text-xs">Id: {participant.participantId}</p> */}
                    <p className="text-xs">닉네임: 망개떡</p>
                    <div>
                      <span className="text-xs">30대, </span>
                      <span className="text-xs">여자</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col row-span-1 mt-1 ml-3 text-left align-middle">
                <div className="flex flex-row flex-wrap my-1">
                  <p className="mx-2 text-xs">💰</p>

                  <p className="text-xs">소유 마일리지: 100,000</p>
                </div>
                <div className="flex flex-row flex-wrap my-1">
                  <p className="mx-2 text-xs">💬</p>

                  <p className="text-xs">
                    느긋한 여행을 추구하는 사람입니다 !!
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
}
