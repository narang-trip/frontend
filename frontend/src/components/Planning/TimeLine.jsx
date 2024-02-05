const TimeLine = (props) => {
  console.log(props);
  const lineCnt =
    Number(props.Time.endHour) -
    Number(props.Time.startHour) -
    (Number(props.Time.endMinute) - Number(props.Time.startMinute)) / 30;
  console.log(lineCnt);
  const m = lineCnt / 100;

  return (
    <div className="grid grid-cols h-full content-between">
      {[...Array(lineCnt)].map((_, index) => (
        <div key={index} className={`border-b border-red-600 w-full mt-8`}></div>
      ))}
    </div>
  );
};

export default TimeLine;
