import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";

import { ModalPortal } from "../components/modals/ModalPortal";
import NewPlan from "../components/modals/NewPlan";
import PlanSummary from "../components/Planning/PlanSummary";
import { scheduleActions } from "../store/scheduleSlice";
import { placesActions } from "../store/placeSlice";

const MyPlan = () => {
  const [pageNo, setPageNo] = useState(0);
  const [planData, setPlanData] = useState([]);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const dispatch = useDispatch();

  dispatch(scheduleActions.reset());
  dispatch(placesActions.reset());

  const { ref, inView } = useInView({
    threshold: 0, // div태그가 보일 때 inView가 true로 설정
  });

  const list = window.sessionStorage.getItem("plan");
  useMemo(() => {
    if (list !== null) {
      setPlanData([JSON.parse(list)]);
    }
  }, [list]);
  console.log(planData);

  const getMyPlanList = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PLAN_REQUEST_URI}/myList/page/${pageNo}`
      );

      // 가져올 항목이 없으면 중단
      if (response.data.content.length === 0) {
        return;
      }

      // 새로운 데이터를 기존 데이터에 추가
      setPlanData((prevData) => [...prevData, ...response.data.content]);

      // 페이지 번호 증가
      setPageNo((prevPageNo) => prevPageNo + 1);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

  // inView가 true일때 데이터를 가져옴
  useEffect(() => {
    if (inView) {
      console.log(`${pageNo} : 무한 스크롤 요청 🎃`);
      getMyPlanList();
    }
  }, [inView]);

  // 계획 만들기 모달
  const makePlan = () => {
    setIsNewPlanOpen(true);
  };
  const CloseNewPlanModal = () => {
    setIsNewPlanOpen(false);
  };

  useEffect(() => {
    // 모달이 열렸을 때 스크롤 막기 위함
    if (isNewPlanOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNewPlanOpen]);

  return (
    <div className="relative">
      <p className="my-2 text-2xl font-bold text-center">나의 계획</p>
      <button
        className="absolute top-0 right-0 border-2 border-yellow-600 rounded-md bg-yellow-400 text-xl text-white px-2 py-1"
        onClick={makePlan}
      >
        계획 만들기
      </button>
      {planData.map((plan, idx) => (
        <PlanSummary plan={plan} key={idx} />
      ))}
      <div ref={ref} />
      {isNewPlanOpen && (
        <ModalPortal>
          <NewPlan onClose={CloseNewPlanModal} />
        </ModalPortal>
      )}
    </div>
  );
};

export default MyPlan;
