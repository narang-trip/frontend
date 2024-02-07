import { useEffect, useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { scheduleActions } from "../../store/scheduleSlice";

const Schedule = (props) => {
  const list = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const dayList = list.list[props.data.dayIdx];
  const schedule = dayList[props.data.scheduleIdx];
  const blackHeight = list.blackHeight / (list.time.lineCnt - 1) / 3;

  const blackCSS = {
    height: `${blackHeight}px`,
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
      scheduleActions.setScheduleTime({
        time: e.target.value,
        day: props.data.dayIdx,
        index: props.data.scheduleIdx,
      })
    );
  };

  const textChange = (e) => {
    setText(e.target.value);
    dispatch(
      scheduleActions.setComment({
        comment: e.target.value,
        day: props.data.dayIdx,
        index: props.data.scheduleIdx,
      })
    );
  };

  useMemo(() => {
    const sh = (t * blackHeight) / 10;
    scheduleCSS = { height: `${sh}px` };
  });

  return (
    <>
      {schedule.title ? (
        <Draggable
          draggableId={`${props.data.dayIdx}list_item${props.data.scheduleIdx}`}
          index={props.data.scheduleIdx}
          key={props.data.scheduleIdx}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
          draggableId={`${props.data.dayIdx}list_item${props.data.scheduleIdx}`}
          index={props.data.scheduleIdx}
          key={props.data.scheduleIdx}
          isDragDisabled
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <div style={blackCSS} className="bg-black opacity-5"></div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default Schedule;
