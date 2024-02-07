import Plan from "../components/Planning/Plan";
import Map from "../components/GoogleMap/Map";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../store/scheduleSlice";
import { ModalPortal } from "../components/modals/ModalPortal";
import NewPlan from "../components/modals/NewPlan";
import { useState, useEffect } from "react";

export default function PlanningPage() {
  const list = useSelector((state) => state.schedule);
  const card = useSelector((state) => state.places);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [isSavePlanOpen, setIsSavePlanOpen] = useState(false);
  const dispatch = useDispatch();

  console.log(list);

  const onDragEnd = ({ source, destination }) => {
    console.log(source);
    console.log(destination);

    if (!destination) return;
    const idx = Number(destination.droppableId.substr(4));
    if (source.droppableId === "PlaceCard") {
      console.log(card[source.index]);
      const schedule = {
        img: card[source.index].photo,
        title: card[source.index].name,
        loca: card[source.index].loca,
        time: "120",
        comment: "",
      };
      dispatch(scheduleActions.addSchedule([schedule, destination.index, idx]));
    } else {
      const idx2 = Number(source.droppableId.substr(4));
      dispatch(
        scheduleActions.moveSchedule([
          [idx2, source.index],
          [idx, destination.index],
        ])
      );
    }
  };

  const makePlan = () => {
    setIsNewPlanOpen(true);
  };

  const CloseNewPlanModal = () => {
    setIsNewPlanOpen(false);
  };

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
    <div className="h-full">
      <button onClick={makePlan}>계획만들기</button>
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
      {isSavePlanOpen && <ModalPortal></ModalPortal>}
    </div>
  );
}
