import { useRef } from "react";
import axios from "axios";

const BuyMileageModal = (props) => {
  const modalBG = useRef("");

  const pay = () => {
    axios
      .post(
        "/api/payment/ready",
        new URLSearchParams({
          user_id: "1234",
          price: "12345678",
        })
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70"
      onClick={props.onClose}
      ref={modalBG}
    >
      <div
        className="z-10 px-10 py-4 bg-white rounded-3xl w-96 h-82"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <>
          <button className="" onClick={props.onClose}>
            x
          </button>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">
              금액선택
            </legend>
            <div className="mt-2 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="1000"
                  name="1000"
                  type="radio"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-everything"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  1000 원
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="5000"
                  name="5000"
                  type="radio"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  5000 원
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="10000"
                  name="10000"
                  type="radio"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-nothing"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  10000 원
                </label>
              </div>
            </div>
          </fieldset>
          <button onClick={pay} className="mt-2">
            결제하기
          </button>
        </>
      </div>
    </div>
  );
};

export default BuyMileageModal;
