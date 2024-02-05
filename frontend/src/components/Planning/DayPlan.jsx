import Schedule from "./Schedule";

const DayPlan = (props) => {
  return (
    <div className="bg-slate-400 h-full w-60 rounded-xl p-2 overflow-hidden">
      {props.data.index} 일
      {props.data.list.map((data, index) => (
        // eslint-disable-next-line react/jsx-key
        <Schedule data={[data, index, props.data.index]} />
      ))}
    </div>
  );
};

export default DayPlan;
