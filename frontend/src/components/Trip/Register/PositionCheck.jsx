export default function PositionCheck({ value, onChange }) {
  // 여행 테마
  const positionList = [
    "비기너",
    "트레일블레이저",
    "멜로디메이커",
    "포토그래퍼",
    "네비게이터",
    "클린메이트",
    "로드레전드",
    "트렌드파인더",
    "힐링위버",
    "스타일리스트",
    "언어위자드",
    "푸드파이터",
  ];

  const handleCheckboxChange = (position) => {
    const updatedPositions = [...value];

    if (updatedPositions.includes(position)) {
      // 이미 선택된 포지션이면 제거
      updatedPositions.splice(updatedPositions.indexOf(position), 1);
    } else {
      // 선택되지 않은 포지션이면 추가
      updatedPositions.push(position);
    }

    onChange(updatedPositions);
  };

  return (
    <div className="w-full my-2">
      <div className="flex flex-wrap justify-around">
        {positionList.map((position, index) => (
          <div key={index} className="w-[24] p-2 itme">
            <label
              className={`inline-flex items-center px-2.5 py-2.5 text-sm font-medium text-neutral-600 rounded-2xl cursor-pointer ring-1 ring-inset ring-neutral-400/10 hover:bg-neutral-400 hover:bg-opacity-30 ${
                value.includes(position)
                  ? " bg-neutral-400 bg-opacity-30 "
                  : "bg-neutral-50"
              }`}
            >
              <input
                type="checkbox"
                value={position}
                checked={value.includes(position)}
                onChange={() => handleCheckboxChange(position)}
                className="hidden"
              />
              {position}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
