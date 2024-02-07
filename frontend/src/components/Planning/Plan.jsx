// import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

import DayPlan from "./DayPlan";
// import * as Y from "yjs";
// import { WebrtcProvider } from "y-webrtc";

// const ydoc = new Y.Doc();

// const ymap = ydoc.getMap("test");
// const ymapNested = new Y.Map();

// ymap.set("my nested map", ymapNested);
// ymap.set("list", []);

// const provider = new WebrtcProvider("test-demo-room", ydoc, {
//   signaling: ["ws://localhost:5173"],
// });

// const awareness = provider.awareness;

// awareness.setLocalStateField("user", {
//   name: "Emmanuelle Charpentier",
//   color: "#ffb61e",
// });

// awareness.on("change", () => {
//   console.log(Array.from(awareness.getStates().values()));
// });

const Plan = () => {
  const list = useSelector((state) => state.schedule).list;
  // ydoc.on("afterTransaction", () => {
  //   setList(Array.from(ymap.get("list")));
  // });

  // useMemo(() => {
  //   ymap.set("list", list);
  // }, [JSON.stringify(list)]);

  return (
    <div className="relative w-full flex overflow-x-scroll gap-1 m-1">
      {list.map((data, index) => (
        <div className="flex" key={index}>
          <Droppable droppableId={`list${index}`}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <DayPlan index={index} key={index} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
};

export default Plan;
