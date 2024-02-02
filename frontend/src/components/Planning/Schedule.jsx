const Schedule = (props) => {
  const data = {
    img: props.data.img,
    title: props.data.title,
    time: props.data.time,
    comment: "",
  };

  return (
    <div className="flex flex-col bg-white w-56 h-auto rounded-xl overflow-hidden">
      <div className="flex">
        <img className="w-20 h-20 rounded-lg" src={data.img} alt="이미지" />
        <div>
          <p>{data.title}</p>
          <p>{data.time} 분</p>
        </div>
      </div>
      <textarea className="m-1" name="comment" id="comment" placeholder="" />
    </div>
  );
};

export default Schedule;
