import { useSelector } from "react-redux";

const ShowTime = () => {
  const lineCnt = useSelector((state) => state.schedule).time.lineCnt;

  return (
    <div className="absolute w-full h-full grid grid-cols content-between pt-8">
      {[...Array(lineCnt)].map((_, index) => (
        <div key={index} className={`border-b border-red-600 w-full`}></div>
      ))}
    </div>
  );
};

export default ShowTime;
