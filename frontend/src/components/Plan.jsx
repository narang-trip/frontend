import { useState } from "react";
import DayPlan from "./DayPlan";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Plan = () => {
  const [list, setList] = useState([]);

  const add = () => {
    setList([...list, new Array()]);
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const scourceKey = Number(source.droppableId.replace("list", ""));
    const destinationKey = Number(destination.droppableId.replace("list", ""));

    const tmplist = Array.from(list);
    const [value] = tmplist.at(scourceKey).splice(source.index, 1);
    tmplist.at(destinationKey).splice(destination.index, 0, value);
    setList(tmplist);
  };

  return (
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={onDragEnd} style={{ display: "flex" }}>
        {list.map((data, index) => (
          <div style={{ flexDirection: "column" }} key={index}>
            <Droppable droppableId={`list${index}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <DayPlan
                    data={{ index: index + 1, list: list.at(index) }}
                    key={index}
                  />
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <button onClick={add}>날짜추가</button>
    </div>
  );
};

export default Plan;
