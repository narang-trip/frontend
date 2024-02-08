import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get("code");
    console.log(code);
    console.log("test");
    (async () => {
      try {
        const res = await axios.post(
          // `https://i10a701.p.ssafy.io/api/user/login/oauth/kakao?code=${code}`
          "https://i10a701.p.ssafy.io/api/user/login/oauth/kakao",
          code
        );
        console.log(res);
        // dispatch(authActions.Login({code, userId}));
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return <>뭔가 뭔가 무언가의 페이지</>;
};

export default Login;
