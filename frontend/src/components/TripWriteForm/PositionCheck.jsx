export default function PositionCheck({ value, onChange }) {
  // 여행 테마
  const positionList = [
    "역할1",
    "역할2",
    "역할3",
    "역할4",
    "역할5",
    "역할6",
    "역할7",
    "역할8",
    "역할9",
    "역할10",
    "역할11",
    "역할12",
  ];

  return (
    <div className="w-full my-2">
          <label className="text-sm">모집 포지션</label>
          <div className="flex flex-wrap">
          {positionList.map((position, index) => (
            <div key={index} className="w-1/4 p-2">
              <input type="checkbox" value={position}></input>
              <label className="m-2 text-xs">{position}</label>
            </div>
          ))}
          </div>
          </div>
  );
}