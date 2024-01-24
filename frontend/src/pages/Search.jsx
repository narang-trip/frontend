const SearchPage = () => {
  // IntersectionObserver 등록
  const entries = [];
    
  // 20개의 아이템 추가 함수

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // 관찰 대상이 viewport 안에 들어온 경우 'active' 클래스 추가
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("active");
      }
      // 그 외의 경우 'active' 클래스 제거
      else {
        entry.target.classList.remove("active");
      }
    });
  });

  // 관찰할 대상을 선언하고, 해당 속성을 관찰
  const boxList = document.querySelectorAll(".box");
  boxList.forEach((el) => {
    io.observe(el);
  });
  return <div className=""></div>;
};

export default SearchPage;
