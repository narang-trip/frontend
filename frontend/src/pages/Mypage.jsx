import { Paper } from "@mui/material";
import UserInfo from "../components/Mypage/UserInfo";

const Mypage = () => {
  return (
    <div className="flex flex-col m-4">
      <div className="basis-2/5 flex flex-row space-x-2">
        <div className="basis-2/3">달력 2페이지?</div>
        <UserInfo />
      </div>
      <div className="basis-3/5 flex flex-row space-x-2">
        <div className="basis-2/3">
          계획 미리보기
          <Paper>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi culpa
            nam deleniti fugit quam est quisquam tempore molestias, eius tenetur
            fuga inventore voluptatem animi, iure sapiente deserunt, provident
            voluptate molestiae!
          </Paper>
        </div>
        <div className="basis-1/3 flex flex-col space-x-2">
          <div className="basis-1/3">보유 마일리지</div>
          <div className="basis-2/3">뱃지 보여주기</div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
