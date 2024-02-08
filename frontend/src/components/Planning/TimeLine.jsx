import { useSelector } from "react-redux";

const TimeLine = () => {
  const state = useSelector((state) => state.schedule);
  const lineCnt = state.time.lineCnt;
  let isOclock = [];

  if (state.time.startMinute === 30) isOclock.push(false);
  else isOclock.push(true);

  for (let i = 1; i < lineCnt; i++) {
    isOclock.push(!isOclock[i - 1]);
  }

  return (
    <div className="absolute w-full h-full grid grid-cols content-between pt-8">
      {[...Array(lineCnt)].map((_, index) => (
        <>
          {isOclock[index] ? (
            <div key={index} className="border-b opacity-50 border-red-600 w-full"></div>
          ) : (
            <div key={index} className="border-b opacity-25 border-red-600 w-full"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default TimeLine;
