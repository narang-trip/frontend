import { useState } from "react";
import Schedule from "./Schedule";
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";

const DayPlan = (props) => {
  const list = useSelector((state) => state.schedule);
  const tmplist = { ...list };
  console.log(list);

  const add = () => {
    // props.data.list.push(new Array(1).fill(`${1 + list.length}`));
    // setList([...list, new Array(1).fill(`${1 + list.length}`)]);
    // props.update();
  };

  return (
    <div className="bg-slate-400">
      {props.data.index} 일<button onClick={add}>추가</button>
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
              <Schedule data={[props.data.index, data]} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default DayPlan;
