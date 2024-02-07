import { useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const Schedule = (props) => {
  const index = props.data[1];
  const card = props.data[0];
  const data = {
    img: card.img,
    title: card.title,
    time: card.time,
    comment: "",
    loca: [card.loca],
    p: card.padding - 135,
  };

  const blackHeight = useSelector((state) => state.time).blackHeight;
  const blackCSS = { height: `${blackHeight}px` };
  const [t, setT] = useState(240);
  let scheduleCSS;

  const change = (e) => {
    setT(e.target.value);
  };

  useMemo(() => {
    const sh = (blackHeight * t) / 10;
    scheduleCSS = { height: `${sh}px` };
  });

  return (
    <>
      {data.title ? (
        <Draggable
          draggableId={`${props.data[2]}list_item${index}`}
          index={index}
          key={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                style={scheduleCSS}
                className="flex flex-col bg-white w-56 rounded-xl overflow-hidden"
              >
                <div className="flex">
                  <img
                    style={scheduleCSS}
                    className="object-contain w-24 rounded-xl"
                    src={data.img}
                    alt="이미지"
                  />
                  <div>
                    <p>{data.title}</p>
                    <p>
                      <input
                        className="w-20"
                        type="number"
                        value={t}
                        onChange={change}
                        step="30"
                      />
                      분
                    </p>
                    <textarea
                      className="resize-none w-32"
                      name="comment"
                      id="comment"
                      placeholder="간단한 메모"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ) : (
        <Draggable
          draggableId={`${props.data[2]}list_item${index}`}
          index={index}
          key={index}
          isDragDisabled
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div style={blackCSS} className="bg-black"></div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default Schedule;
