import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let auth = "";
  let refreshAuth = "";
  useEffect(() => {
    const params = new URL(document.URL).searchParams;
    const code = params.get("code");
    (async () => {
      try {
        const res = await axios.post(
          `https://i10a701.p.ssafy.io/api/user/login/oauth/naver?code=${code}`
        );
        // console.log(res);
        auth = res.headers["authorization"];
        refreshAuth = res.headers["authorization-refresh"];
        try {
          const userRes = await axios.get(
            "https://i10a701.p.ssafy.io/api/user/getuser",
            {
              headers: {
                Authorization: auth,
                "Authorization-refresh": refreshAuth,
              },
            }
          );

          dispatch(
            authActions.Setting({
              token: auth,
              refreshToken: refreshAuth,
              userId: userRes.data.userId,
              nickname: userRes.data.nickname
            })
          );
        } catch (error) {
          console.error("유저받아오면서 문제생김 : ", error);
        }

        navigate("/");
      } catch (error) {
        console.log("Error during POST request:", error);
      }
    })();
  }, []);

  return <></>;
};

export default Login;
