import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

const PlanModal = ({ onClose, onSelectedPlanId }) => {
  const modalBG = useRef("");
  const [planList, setPlanList] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const fetchPlanList = async () => {
    try {
      const response = await axios.get(
        `https://i10a701.p.ssafy.io/api/plan/my/${userId}`
      );
      setPlanList(response.data);
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchPlanList();
  }, []);

  const handlePlanSelect = (planId) => {

    onSelectedPlanId(planId);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70"
      onClick={onSelectedPlanId}
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
              className="mb-4 text-xl font-semibold hover:text-red-600"
              onClick={onClose}
            >
              <IoMdClose />
            </button>
          </div>
          <p className="m-3 text-lg font-bold text-center">
            계획📑을 선택해주세요!
          </p>
          <div className="inline-block mb-4 align-middle">
            <div className="flex flex-wrap justify-center">
              {planList.map((item, index) => (
                <div key={index}>
                  <div>{item.planName}</div>
                  <div>{item.planDesc}</div>
                  <button
                    className="m-3 text-base rounded-xl bg-stone-100 hover:bg-amber-200"
                    key={index}
                    onClick={() => handlePlanSelect(item.planId)}
                  >
                    선택
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
