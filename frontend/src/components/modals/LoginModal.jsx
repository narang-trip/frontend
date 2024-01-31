import { useRef } from "react";
import {
  kakaoApiKey,
  kakaoRedirectUrl,
  naverApikey,
  naverRedirectUrl,
  naverState,
} from "../../../public/apikey";
import axios from "axios";

const LoginModal = (props) => {
  const modalBG = useRef(null);
  const kakaoLoginURL2 =
    "https://i10a701.p.ssafy.io/oauth2/authorization/kakao";
  const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUrl}&response_type=code`;
  const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverApikey}&response_type=code&redirect_uri=${naverRedirectUrl}&state=${naverState}`;

  const Login = () => {
    axios({
      url: "70.12.247.172",
      method: "post",
      data: {
        name: "veneas",
      },
    })
      .then(function a(response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
<<<<<<< HEAD
      className="fixed top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
=======
      className="bg-gray-500 bg-opacity-70 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-0"
>>>>>>> origin/feature_Mypage
      onClick={props.onClose}
      ref={modalBG}
    >
      <div
        className="z-10 px-10 py-4 bg-white rounded-3xl w-96 h-82"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="">
          <button className="" onClick={props.onClose}>
            x
          </button>
          <h3 className="">로 그 인</h3>
          <div className="flex flex-col" onClick={Login}>
            <a href={kakaoLoginURL2}>
              <img
                className="object-cover h-16 w-36 rounded-xl"
                src="assets/kakao_login.png"
              />
            </a>
            <button>
              <a href={naverLoginURL}>
                <img
                  className="object-cover h-16 w-36 rounded-xl"
                  src="assets/naver_login.png"
                />
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
