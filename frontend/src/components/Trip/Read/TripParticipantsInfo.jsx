import { Fragment } from "react";

export default function TripParticipantsInfo({ participants }) {
  return (
    <Fragment>
      <div>
        {participants &&
          participants.map((participant, idx) => (
            <div
              key={idx}
              className="grid grid-rows-2 p-2 mb-2 border rounded-lg border-neutral-200"
            >
              <div className="row-span-1">
                <div className="grid grid-cols-5">
                  <div className="col-span-1">  <img
                  className="inline-block w-8 h-8 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /></div>

                  <div className="col-span-4">
                    <p className="text-sm font-bold">{participant.participantId}</p>
                  </div>
                </div>
              </div>
              <div className="row-span-1">소유뱃지 && 한마디</div>
            </div>
          ))}
      </div>
    </Fragment>
  );
}
