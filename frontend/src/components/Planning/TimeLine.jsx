const TimeLine = (props) => {
  console.log(props);
  const lineCnt =
    (Number(props.Time.endHour) - Number(props.Time.startHour)) * 2 +
    (Number(props.Time.endMinute) - Number(props.Time.startMinute)) / 30 +
    1;
  console.log(lineCnt);

  return (
    <div className="absolute w-full h-full grid grid-cols content-between pt-8">
      {[...Array(lineCnt)].map((_, index) => (
        <div key={index} className={`border-b border-red-600 w-full`}></div>
      ))}
    </div>
  );
};

export default TimeLine;
