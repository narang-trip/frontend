
export default function TitleInput({ value, onChange }) {
  return (
    <div className="w-full my-5">
      <label className="mr-10 text-xl font-medium">여행 제목</label>
      <input
        type="text"
        name="title"
        placeholder="제목을 작성해주세요"
        value={value}
        onChange={onChange}
        required
        className="border border-stone-200 bg-stone-0 py-1.5 w-2/3 text-gray-900 placeholder:text-gray-400"
      />
    </div>
  );
}