import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authAction } from "../store/auth-slice";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(code);

  useEffect(() => {
    console.log("test");
    try {
      const res = axios.get("api/user/login/oauth/kakao");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  });

  dispatch(authAction.Login(code));

  return <>뭔가 뭔가 무언가의 페이지</>;
};

export default Login;
