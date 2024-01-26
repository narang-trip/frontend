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
  ];

  return (
    <div>
          <label>모집 포지션</label>
          {positionList.map((position, index) => (
            <div key={index}>
              <input type="checkbox" value={position}></input>
              <label>{position}</label>
            </div>
          ))}
          </div>
  );
}