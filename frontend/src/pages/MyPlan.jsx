import axios from "axios";
<<<<<<< HEAD
=======
import { useCallback, useEffect, useMemo, useState } from "react";
>>>>>>> origin/feature_myplanning
import { useInView } from "react-intersection-observer";
import { useCallback, useState, useEffect } from "react";
import { ModalPortal } from "../components/modals/ModalPortal";

import NewPlan from "../components/modals/NewPlan";

const MyPlan = () => {
  const [pageNo, setPageNo] = useState(0);
  const [planData, setPlanData] = useState([]);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);

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

  return (
    <>
      <h2>내가 만든 계획</h2>
      <button onClick={makePlan}>계획 만들기</button>
      {planData.map((plan, idx) => (
        <PlanSummary plan={plan} key={idx} />
      ))}
      <div ref={ref} />
      {isNewPlanOpen && (
        <ModalPortal>
          <NewPlan onClose={CloseNewPlanModal} />
        </ModalPortal>
      )}
    </>
  );
};

export default MyPlan;
