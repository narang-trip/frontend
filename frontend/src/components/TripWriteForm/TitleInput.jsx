
export default function TitleInput({ value, onChange }) {
  return (
    <div>
      <label>여행제목</label>
      <input
        type="text"
        name="title"
        placeholder="제목을 작성해주세요"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}