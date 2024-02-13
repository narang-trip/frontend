import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userId;
  let token;
  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get("code");
    console.log(code);
    console.log("test");
    (async () => {
      try {
        const res = await axios.post(
          `https://i10a701.p.ssafy.io/api/user/login/oauth/kakao?code=${code}`
          // "https://i10a701.p.ssafy.io/api/user/login/oauth/kakao",
          // {
          //   code: code,
          // }
        );
        console.log(res);
        console.log(res.headers.authorization);
        dispatch(
          authActions.Login({ token: res.headers.authorization, userId })
        );
        navigate("/");
      } catch (error) {
        console.log("Error during POST request:", error);
      }
    })();
  });

  const test = async () => {
    console.log(test, token);
    try {
      const res = await axios.get(
        `https://i10a701.p.ssafy.io/api/user/getuser`,
        {
          token: token,
        }
      );
      console.log(res);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={test}>유저정보 가져오기</button>
      <b />
      뭔가 뭔가 무언가의 페이지 카카오로그인
    </>
  );
};

export default Login;
