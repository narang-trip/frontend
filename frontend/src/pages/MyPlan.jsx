import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";

import { ModalPortal } from "../components/modals/ModalPortal";
import NewPlan from "../components/modals/NewPlan";
import PlanSummary from "../components/Planning/PlanSummary";
import { scheduleActions } from "../store/scheduleSlice";
import { placesActions } from "../store/placeSlice";

const MyPlan = () => {
  const [planData, setPlanData] = useState([]);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const userId = useSelector((state) => state.auth).userId;
  const dispatch = useDispatch();

  dispatch(scheduleActions.reset());
  dispatch(placesActions.reset());

  // window.sessionStorage.setItem(
  //   "plan",
  //   JSON.stringify({
  //     lastModifiedDate: "2024-02-14",
  //     ownerId: "9d45d704-6312-3a99-bc42-1fdaf215f114",
  //     participantIds: [],
  //     planDesc: "걸어가라고",
  //     planId: "fc203c93-7f7a-4614-84a1-303cccbe3745",
  //     planInfo:
  //       "JTdCJTIydGl0bGUlMjIlM0ElMjIlRUElQjElQjglRUMlOTYlQjQlRUElQjAlODAlMjIlMkMlMjJ0aW1lJTIyJTNBJTdCJTIydG90YWxEYXklMjIlM0ExJTJDJTIyc3RhcnRIb3VyJTIyJTNBMTAlMkMlMjJzdGFydE1pbnV0ZSUyMiUzQTAlMkMlMjJlbmRIb3VyJTIyJTNBMjIlMkMlMjJlbmRNaW51dGUlMjIlM0EwJTJDJTIydG90YWxUaW1lJTIyJTNBNzIwJTJDJTIybGluZUNudCUyMiUzQTI1JTJDJTIyYmxhY2tIZWlnaHQlMjIlM0ElMjIlMjIlN0QlMkMlMjJibGFja0hlaWdodCUyMiUzQTY0NiUyQyUyMmxpc3QlMjIlM0ElNUIlNUIlN0IlMjJpbWclMjIlM0ElMjJodHRwcyUzQSUyRiUyRm1hcHMuZ29vZ2xlYXBpcy5jb20lMkZtYXBzJTJGYXBpJTJGcGxhY2UlMkZqcyUyRlBob3RvU2VydmljZS5HZXRQaG90byUzRjFzQVRwbERKYkMyb2pGeHVZM1VRMmo2NHVQMnkxV0t5cGN3RjY0dnRiQ28wbG9SOW10dmJLbk10M3lnT2RHeV9BbGV2MHVQQnFLMzBhYmlBbmF3Q3RaSl9xXzdsZGtLUnRkTUxtQm1PZFR3WmVia0YwWU9xeUFfd3JkcGxpRjRneG9UWEMxR1NOaGt1TkdaRTJQU0VxZ1VXLVBBRVRBS2xDNWE4cUg0eUZmMWJDZWNXVU9DR1Y0JTI2M3UyMDAlMjY0dTIwMCUyNjVtMSUyNjJlMSUyNmNhbGxiYWNrJTNEbm9uZSUyNmtleSUzREFJemFTeUFfRldjXzlJcmljUXVGWVljdEtZVi1jeEktQ2RMQ29ISSUyNnRva2VuJTNEMTExMjE1JTIyJTJDJTIydGl0bGUlMjIlM0ElMjIlRUMlOTclQUQlRUMlODIlQkMlRUMlOTclQUQlRUMlOTUlOUUlMjIlMkMlMjJsb2NhJTIyJTNBJTVCMzcuNTAwNzkzOSUyQzEyNy4wMzY5NjU2JTVEJTJDJTIydGltZSUyMiUzQSUyMjEyMCUyMiUyQyUyMmNvbW1lbnQlMjIlM0ElMjIlMjIlMkMlMjJkaXN0YW5jZSUyMiUzQTQlN0QlMkMlNUIlNUQlMkMlN0IlMjJpbWclMjIlM0ElMjJodHRwcyUzQSUyRiUyRm1hcHMuZ29vZ2xlYXBpcy5jb20lMkZtYXBzJTJGYXBpJTJGcGxhY2UlMkZqcyUyRlBob3RvU2VydmljZS5HZXRQaG90byUzRjFzQVRwbERKYTlvYnZ3c0Y2T3NDMEJzazhJUDU2bVh6UUFLRWdVMHBzRm9aVVhRekRTVjM4Y0ZqZUJpQnV3eV9nOUJoRWdfYnBVVlc2ZnpVTGtVeHZWM1duak91V0lWdVZ3UHpmM1BWNlJnNDZaZ2tQZEpXa3hyZy1SUFZwZ3FCQmZnLUVpTy1JRVBqU0lQWWYzNlRtekFhNlhITmgtaFo0M2wydi1uYU9lX2dHY3lIdTZ4ZEsyJTI2M3UyMDAlMjY0dTIwMCUyNjVtMSUyNjJlMSUyNmNhbGxiYWNrJTNEbm9uZSUyNmtleSUzREFJemFTeUFfRldjXzlJcmljUXVGWVljdEtZVi1jeEktQ2RMQ29ISSUyNnRva2VuJTNEMjM3NjklMjIlMkMlMjJ0aXRsZSUyMiUzQSUyMiVFQSVCMCU5NSVFQiU4MiVBOCVFQyU5NyVBRCVFQyU4MiVBQyVFQSVCMSVCMCVFQiVBNiVBQyUyMiUyQyUyMmxvY2ElMjIlM0ElNUIzNy40OTc5MDUyJTJDMTI3LjAyNzU3NzclNUQlMkMlMjJ0aW1lJTIyJTNBJTIyMTIwJTIyJTJDJTIyY29tbWVudCUyMiUzQSUyMiUyMiU3RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCUyQyU1QiU1RCU1RCU1RCU3RA==",
  //     planName: "걸어가",
  //   })
  // );

  // const sessionData = JSON.parse(window.sessionStorage.getItem("plan"));
  // console.log(sessionData);
  // const list = decodeURIComponent(window.atob(sessionData.planInfo));
  // const day = JSON.parse(list).time.totalDay;
  // console.log(JSON.parse(list).time.totalDay);
  // useMemo(() => {
  //   if (sessionData !== null) {
  //     setPlanData([sessionData]);
  //   }
  // }, [list]);

  const getUsersPlan = async () => {
    console.log("userId : ", userId);
    if (userId !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PLAN_REQUEST_URI}/my/${userId}`
        );
        console.log("response : ", response);
        setPlanData(response.data);
      } catch (error) {
        console.log("Error : ", error);
      }
    }
  };

  useEffect(() => {
    getUsersPlan();
  }, [userId]);

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
        className="absolute top-0 right-0 px-2 py-1 text-xl text-white bg-yellow-400 border-2 border-yellow-600 rounded-md"
        onClick={makePlan}
      >
        계획 만들기
      </button>
      {planData.length === 0 ? (
        <>
          <p className="pt-6 my-2 text-xl font-bold text-center">
            작성한 계획이 없어요
          </p>
        </>
      ) : (
        <div className="flex flex-wrap justify-around gap-4">
          {planData.map((plan, idx) => (
            <PlanSummary plan={plan} key={idx} />
          ))}
        </div>
      )}
      {isNewPlanOpen && (
        <ModalPortal>
          <NewPlan onClose={CloseNewPlanModal} />
        </ModalPortal>
      )}
    </div>
  );
};

export default MyPlan;
