import { Fragment } from "react";

export default function ReceiveRequestsInfo() {
  return (
    <Fragment>
      <div className="flex flex-row m-5">
        <div className="w-3/4 p-4 border rounded-lg h-36 border-stone-400">
          <div>
            <img
              className="inline-block w-12 h-12 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="mx-3 text-ml">user_1</span>
            <span>운전자</span>
          </div>
          <div>
          </div>
        </div>
            <button>수락</button>
            <button>거절</button>
      </div>
    </Fragment>
  );
}
