import { Avatar } from "@mui/material";

const UserInfo = () => {
  return (
    <div className="basis-1/3 border-black">
      <Avatar alt="프로필 이미지" src="" sx={{ width: 50, height: 50 }} />
      <table className="table-fixed">
        <tbody>
          <tr>
            <th>선호 포지션</th>
            <td>정보에서 받아오기</td>
          </tr>
          <tr>
            <th>생일</th>
            <td>xxxx.xx.xx</td>
          </tr>
          <tr>
            <th>SNS</th>
            <td>x, fb, insta, etc...</td>
          </tr>
        </tbody>
      </table>
      소개글
      <article className="text-wrap ...">
        <h3>Beloved Manhattan soup stand closes</h3>
        <p>New Yorkers are facing the winter chill...</p>
      </article>
      <button>정보 수정</button>
      <button>회원 탈퇴</button>
    </div>
  );
};

export default UserInfo;
