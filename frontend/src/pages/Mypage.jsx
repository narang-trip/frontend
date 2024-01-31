import UserInfo from "../components/Mypage/UserInfo";

const Mypage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-2/5 p-4 flex flex-row space-x-2">
        <div className="w-3/5">달력 2페이지?</div>
        <UserInfo />
      </div>
      <div className="h-3/5 p-4 flex flex-row space-x-2">
        <div className="w-3/5">계획 미리보기</div>
        <div className="w-2/5 flex flex-col">
          보유 마일리지
          <div className="h-1/3 shadow-xl p-3 border-black rounded-lg"></div>
          뱃지 보여주기
          <div className="h-2/3 shadow-xl p-3 border-black rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
