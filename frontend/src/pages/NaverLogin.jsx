import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  let auth = "";
  let refreshAuth = "";
  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get("code");
    console.log(code);
    console.log("test");
    (async () => {
      try {
        const res = await axios.post(
          `https://i10a701.p.ssafy.io/api/user/login/oauth/naver?code=${code}`
        );
        console.log(res);
        auth = res.headers["authorization"];
        refreshAuth = res.headers["authorization-refresh"];
        console.log("바깥")
        console.log("auth :", auth)
        console.log("refreshAuth :", refreshAuth)
        try {
          console.log("안")
          console.log("auth :", auth)
          console.log("refreshAuth :", refreshAuth)
          
          const userRes = await axios.get(
            "https://i10a701.p.ssafy.io/api/user",
            {
              headers: {
                "Authorization": auth,
                "Authorization-refresh": refreshAuth,
              },
            }
          );
          console.log("userRes : ", userRes);
        } catch (error) {
          console.error("유저받아오면서 문제생김 : ", error);
        }

        dispatch(
          authActions.Login({
            token: res.headers.authorization,
            refreshToken: res.headers["authorization-refresh"],
          })
        );
        navigate("/");
      } catch (error) {
        console.log("Error during POST request:", error);
      }
    })();
  }, []);

  const test = async () => {
    console.log("토큰?", token);
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
      뭔가 뭔가 무언가의 페이지 네이버로그인
    </>
  );
};

export default Login;
