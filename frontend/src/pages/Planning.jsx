import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../store/scheduleSlice";
import { ModalPortal } from "../components/modals/ModalPortal";
import { useState, useEffect, useMemo } from "react";

import Plan from "../components/Planning/Plan";
import Map from "../components/GoogleMap/Map";
import NewPlan from "../components/modals/NewPlan";
import SavePlanModal from "../components/modals/SavePlanModal";
import ShowTime from "../components/Planning/ShowTime";

export default function PlanningPage() {
  let list = useSelector((state) => state.schedule);
  const card = useSelector((state) => state.places);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [isSavePlanOpen, setIsSavePlanOpen] = useState(false);
  const dispatch = useDispatch();

  console.log(list);

  useEffect(() => {
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_PLAN_REQUEST_URI}/myList`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  });

  // useMemo(() => {
  //   // 현재 URL에서 Base64로 인코딩된 JSON 문자열 추출
  //   let urlParams = new URL(document.URL).searchParams;
  //   let base64EncodedString = urlParams.get("a");
  //   if (base64EncodedString !== null) {
  //     console.log(base64EncodedString);

  //     // Base64 디코딩 후 UTF-8 디코딩하여 JSON 문자열 추출
  //     let utf8EncodedString = atob(base64EncodedString);
  //     console.log(utf8EncodedString);
  //     let jsonString = decodeURIComponent(escape(utf8EncodedString));

  //     // JSON 문자열을 JavaScript 객체로 변환
  //     let getList = JSON.parse(jsonString);
  //     console.log(getList.blackHeight);

  //     if (getList.blackHeight !== 0) {
  //       dispatch(scheduleActions.setSchedule(getList));
  //       list = getList;
  //       console.log(list);
  //       window.history.pushState(
  //         {},
  //         null,
  //         "/makeplan/?a=" + btoa(unescape(encodeURIComponent(JSON.stringify(list))))
  //       );
  //     }
  //   }
  // }, [list]);

  const onDragEnd = ({ source, destination }) => {
    // console.log(source);
    // console.log(destination);

    if (!destination) return; // 범위밖일 때 드래그 취소
    const idx = Number(destination.droppableId.substr(4));
    if (source.droppableId === "PlaceCard") {
      // 추가;
      // console.log(card[source.index]);
      const schedule = {
        img: card[source.index].photo,
        title: card[source.index].name,
        loca: card[source.index].loca,
        time: "120",
        comment: "",
      };
      dispatch(
        scheduleActions.addSchedule({
          schedule: schedule,
          index: destination.index,
          day: idx,
        })
      );
    } else {
      // 이동
      const idx2 = Number(source.droppableId.substr(4));
      dispatch(
        scheduleActions.moveSchedule({
          start: { day: idx2, index: source.index },
          end: { day: idx, index: destination.index },
        })
      );
    }
  };
  // 계획 저장하기 모달
  const savePlan = () => {
    setIsSavePlanOpen(true);
  };
  const CloseSavePlanModal = () => {
    setIsSavePlanOpen(false);
  };

  useEffect(() => {
    // 모달이 열렸을 때 스크롤 막기 위함
    if (isNewPlanOpen || isSavePlanOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNewPlanOpen, isSavePlanOpen]);

  return (
    <div className="h-5/6">
      <ShowTime />
      <div className="h-full pl-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full">
            <Plan />
            <Map />
          </div>
        </DragDropContext>
        <button onClick={savePlan}>저장하기</button>
        {isNewPlanOpen && (
          <ModalPortal>
            <NewPlan onClose={CloseNewPlanModal} />
          </ModalPortal>
        )}
        {isSavePlanOpen && (
          <ModalPortal>
            <SavePlanModal onClose={CloseSavePlanModal} />
          </ModalPortal>
        )}
      </div>
    </div>
  );
}
