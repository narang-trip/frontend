import { useRef } from "react";

const LocationModal = (props) => {
  const modalBG = useRef("");

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
      onClick={props.onClose}
      ref={modalBG}
    >
      <div
        className="z-10 px-10 py-8 bg-white w-[28rem] h-[40rem] rounded-3xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className=" font-spoqa">
          <div className="flex justify-end">
            <button
              className="mb-4 text-xl font-semibold"
              onClick={props.onClose}
            >
              X
            </button>
          </div>
          <div className="inline-block mb-4 align-middle">
            <img
              className="inline-block w-12 h-12 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span className="mx-3 text-ml">user_1</span>
          </div>
          <div className="mx-4 my-4">
            <span>한마디 작성!</span>
            <div className="p-3 my-3 border border-stone-600 rounded-xl">
              <textarea className=" outline-none w-full text-xs resize-none h-[4rem] p-1.5" />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="inline-flex items-center px-4 py-2 text-sm font-semibold text-indigo-700 rounded-md bg-blue-50 ring-1 ring-inset ring-blue-700/10">
              신청하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
