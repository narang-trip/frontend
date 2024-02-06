import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authAction } from "../store/auth-slice";
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
        "https://i10a701.p.ssafy.io/api/user/login/oauth/kakao",
        { code: code }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    dispatch(authAction.Login(code));
  })();
})

  return <>뭔가 뭔가 무언가의 페이지</>;
};

export default Login;
