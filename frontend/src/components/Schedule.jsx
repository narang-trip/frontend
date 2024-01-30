const Schedule = (props) => {
  const data = {
    img: props.data.img,
    title: props.data.title,
    time: props.data.time,
  };

  return (
    <div className="flex bg-white w-40 h-24">
      <img className="w-20 h-20" src={data.img} alt="이미지" />
      <div>
        <p>장소 : {data.title}</p>
        <p>소요시간 : {data.time}</p>
      </div>
    </div>
  );
};

export default Schedule;
