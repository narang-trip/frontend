import Plan from "../components/Planning/Plan";
import Map from "../components/GoogleMap/Map";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { scheduleActions } from "../store/scheduleSlice";

export default function PlanningPage() {
  const list = useSelector((state) => state.schedule);
  const card = useSelector((state) => state.places);
  const dispatch = useDispatch();

  console.log(list);
  console.log(card);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    const idx = Number(destination.droppableId.substr(4));
    const schedule = {
      img: card[source.index].photo,
      title: card[source.index].name,
    };
    if (source.droppableId === "PlaceCard") {
      dispatch(scheduleActions.addSchedule([schedule, source.index, idx]));
      console.log("추가");
    } else {
      const idx2 = Number(source.droppableId.substr(4));
      dispatch(
        scheduleActions.moveSchedule([
          [idx2, source.index],
          [idx, destination.index],
        ])
      );
      console.log("이동");
    }
  };

  return (
    <>
      <div className="text-2xl text-gray">계획짜는 페이지</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Plan />
        <Map />
      </DragDropContext>
    </>
  );
}
