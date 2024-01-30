import Schedule from "./Schedule";
import { Draggable } from "react-beautiful-dnd";

const DayPlan = (props) => {
  return (
    <div className="bg-slate-400">
      {props.data.index} 일
      {props.data.list.map((data, index) => (
        <Draggable
          draggableId={`${props.data.index}list_item${index}`}
          index={index}
          key={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Schedule data={data} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default DayPlan;
