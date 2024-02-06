import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authAction } from "../store/authSlice";
import { useEffect } from "react";

const Login = () => {
  const params = new URL(document.URL).searchParams;
  const code = params.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(authAction.Login(code));

  useEffect(() => {
    console.log("여기 왔다감");
    navigate("/");
  });

  return <>뭔가 뭔가 무언가의 페이지</>;
};

export default Login;
