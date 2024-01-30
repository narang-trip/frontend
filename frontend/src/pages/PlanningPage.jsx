import Plan from "../components/Plan";
import Map from "../components/GoogleMap/Map";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

export default function PlanningPage() {
  const list = useSelector((state) => state.schedule);
  const tmplist = { ...list };
  const card = useSelector((state) => state.places);
  const dispatch = useDispatch();

  console.log(list);
  console.log(card);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    console.log(source);
    console.log(destination);
    if (source.droppableId === "PlaceCard") {
      const schedule = {
        img: card[source.index].photo,
        title: card[source.index].name,
      };
      const idx = destination.droppableId.substr(4);
      console.log(tmplist[idx]);
      tmplist[idx].push(schedule);
      tmplist[idx].splice(destination.index, 0, schedule);
      // dispatch(scheduleActions.setSchedule(schedule));
      console.log("추가");
    } else {
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
