import { useEffect, useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../store/scheduleSlice";

const Schedule = (props) => {
  const list = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const day = props.data[1] - 1;
  const dayList = list[day];
  const index = props.data[0];
  const card = dayList[index];

  const blackHeight = useSelector((state) => state.time).blackHeight;
  const blackCSS = { height: `${blackHeight}px` };
  const [t, setT] = useState();
  const [text, setText] = useState();
  useEffect(() => {
    setT(card.time);
    setText(card.comment);
  });
  let scheduleCSS;

  const timeChange = (e) => {
    setT(e.target.value);
    dispatch(scheduleActions.setTime([e.target.value, day, index]));
  };

  const textChange = (e) => {
    setText(e.target.value);
    dispatch(scheduleActions.setComment([e.target.value, day, index]));
  };

  useMemo(() => {
    const sh = (blackHeight * t) / 10;
    scheduleCSS = { height: `${sh}px` };
  });

  return (
    <>
      {card.title ? (
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
                    src={card.img}
                    alt="이미지"
                  />
                  <div>
                    <p>{card.title}</p>
                    <p>
                      <input
                        className="w-20"
                        type="number"
                        value={t}
                        onChange={timeChange}
                        step="30"
                      />
                      분
                    </p>
                    <textarea
                      className="resize-none w-32"
                      name="comment"
                      id="comment"
                      placeholder="간단한 메모"
                      onChange={textChange}
                      value={text}
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
