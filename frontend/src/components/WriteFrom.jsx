import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function WriteForm() {
  const [formData, setFormData] = useState({
    title: "",
    concept: "",
    img: "",
    period: "",
    location: "",
    count: "",
    position: "",
    plan: "",
    description: "",
  });

  // 이미지 파일 자체의 상태
  const [file, setFile] = useState("");
  // 이미지 파일의 url
  const [uploadedImage, setUploadedImage] = useState("");

  const navigate = useNavigate();

  // 값이 변할 때 추적하기 위한 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 파일 데이터 보관하기 위한 함수
  const handleFileChange = (e) => {
    const { files } = e.target;
    setFile(files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }; // handleSubmit 끝
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label>여행제목</label>
          <input
            type="text"
            name="title"
            placeholder="제목을 작성해주세요"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>여행 컨셉</label>
          <select>
            <option>빨강</option>
            <option>주황</option>
            <option>노랑</option>
            <option>초록</option>
            <option>파랑</option>
            <option>남색</option>
            <option>보라</option>
          </select>
        </div>
        <div>
          <label>메인 이미지</label>
          {uploadedImage ? <img src={uploadedImage} /> : <img src={`assets/airplain.jpg`} alt="기본이미지" />}
          <input type="file" onChange={handleFileChange} />
        </div>
      </form>
    </Fragment>
  );
}
