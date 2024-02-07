import { useEffect, useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../store/scheduleSlice";

const Schedule = (props) => {
  const list = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const dayList = list.list[props.dayIdx];
  console.log(props.scheduleIdx);
  const schedule = dayList[props.scheduleIdx];
  // console.log(list);
  // console.log(list.blackHeight);
  // console.log(list.blackHeight / (list.time.lineCnt - 1) / 3);

  const blackCSS = {
    height: `${list.blackHeight / (list.time.lineCnt - 1) / 3}px`,
  };
  const [t, setT] = useState();
  const [text, setText] = useState();
  useEffect(() => {
    setT(schedule.time);
    setText(schedule.comment);
  });
  let scheduleCSS;

  const timeChange = (e) => {
    setT(e.target.value);
    dispatch(
      scheduleActions.setTime([e.target.value, props.dayIdx, props.scheduleIdx])
    );
  };

  const textChange = (e) => {
    setText(e.target.value);
    dispatch(
      scheduleActions.setComment([
        e.target.value,
        props.dayIdx,
        props.scheduleIdx,
      ])
    );
  };

  useMemo(() => {
    const sh = (1 * t) / 10;
    scheduleCSS = { height: `${sh}px` };
  });

  return (
    <>
      {schedule.title ? (
        <Draggable
          draggableId={`${props.dayIdx}list_item${props.scheduleIdx}`}
          index={props.scheduleIdx}
          key={props.scheduleIdx}
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
                    src={schedule.img}
                    alt="이미지"
                  />
                  <div>
                    <p>{schedule.title}</p>
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
          draggableId={`${props.dayIdx}list_item${props.scheduleIdx}`}
          index={props.scheduleIdx}
          key={props.scheduleIdx}
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
