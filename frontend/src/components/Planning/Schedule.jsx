import { useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const Schedule = (props) => {
  const list = useSelector((state) => state.schedule);
  const index = props.data[0];
  const card = list[index];
  console.log(list);
  const data = {
    img: card.img,
    title: card.title,
    time: card.time,
    comment: card.comment,
    loca: [card.loca],
  };

  // console.log(data);

  const blackHeight = useSelector((state) => state.time).blackHeight;
  const blackCSS = { height: `${blackHeight}px` };
  const [t, setT] = useState(data.time);
  let scheduleCSS;

  const change = (e) => {
    setT(e.target.value);
  };

  useMemo(() => {
    const sh = (blackHeight * t) / 10;
    data.time = t;
    scheduleCSS = { height: `${sh}px` };
  });

  return (
    <>
      {data.title ? (
        <Draggable
          draggableId={`${props.data[1]}list_item${index}`}
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
                      value={data.comment}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ) : (
        <Draggable
          draggableId={`${props.data[1]}list_item${index}`}
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
