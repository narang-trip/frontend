export default function ConceptSelect({ value, onChange }) {
  // 여행 테마
  const conceptList = ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라"];
  // 전체 conceptList어떻게 할지 같이 정해야함 -> redux-toolkit에 저장해야 할 것으로 보임
  return (
    <div>
      <label>여행 컨셉</label>
      <select name="concept" value={value} onChange={onChange}>
        {conceptList.map((option, index) => (
          <option key={index} id={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
