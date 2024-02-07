import { Fragment, useState, useEffect } from "react";

export default function ReceiveRequestsInfo({ data }) {
  return (
    <Fragment>
      <div className="flex flex-wrap justify-center w-full">
        <div className="flex flex-row justify-around w-9/12 m-2">
          <div className="grid w-7/12 h-24 grid-rows-2 p-2 border rounded-lg border-stone-400">
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
                    <span className="p-1 border bg-neutral-100 rounded-xl border-neutral-100" key={idx}>{role} </span>
                  ))}
              </div>
              <div className="flex">
                <span className="items-center px-1.5 py-2 mx-1 text-xs font-medium text-gray-700 rounded-full bg-gray-50 ring-2 ring-inset ring-gray-600/20">
                  뱃지1
                </span>
                <span className="items-center px-1.5 py-2 mx-1 text-xs font-medium text-gray-700 rounded-full bg-gray-50 ring-2 ring-inset ring-gray-600/20">
                  뱃지2
                </span>
                <span className="items-center px-1.5 py-2 mx-1 text-xs font-medium text-gray-700 rounded-full bg-gray-50 ring-2 ring-inset ring-gray-600/20">
                  뱃지3
                </span>
              </div>
            </div>
            <div className="p-2 mx-5 text-sm border rounded-xl border-slate-300">
              <p>{data.aspiration}</p>
            </div>
          </div>

          <div className="flex items-center">
            <button className="items-center px-6 py-3 mx-2 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">
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
