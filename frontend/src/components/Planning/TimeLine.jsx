const TimeLine = (props) => {
  console.log(props);
  const lineCnt =
    Number(props.Time.endHour) -
    Number(props.Time.startHour) -
    (Number(props.Time.endMinute) - Number(props.Time.startMinute)) / 30;
  console.log(lineCnt);

  return (
    <>
      <div className="mt-8">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`border-b border-red-600 w-full mb-[${1}]`}
          ></div>
        ))}
      </div>
    </>
  );
};

export default TimeLine;
