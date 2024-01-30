export default function ConceptSelect({ value, onChange }) {
  // 여행 테마
  const conceptList = ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라"];
  // 전체 conceptList어떻게 할지 같이 정해야함 -> redux-toolkit에 저장해야 할 것으로 보임
  return (
    <div className="w-full my-2">
      <label className="mr-10 text-sm font-medium">여행 컨셉</label>
      <select name="concept" value={value} onChange={onChange} className="w-2/3 p-1.5 border border-stone-200 bg-stone-0  text-gray-900 text-xs">
        {conceptList.map((option, index) => (
          <option key={index} id={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

