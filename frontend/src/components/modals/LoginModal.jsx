import { useRef } from "react";
import axios from "axios";

const LoginModal = (props) => {
  const modalBG = useRef(null);
  const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const kakaoRedirectURI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const naverRedirectURI = import.meta.env.VITE_NAVER_REDIRECT_URI;
  const naverState = "flase";
  const kakaoLoginURI = `https://kauth.kakao.com/oauth/authorize?scope=account_email&client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectURI}&response_type=code&prompt=login`;
  const kakaoLoginURI2 =
    "https://i10a701.p.ssafy.io/api/user/oauth2/authorization/kakao";
  const kakaoLoginURI3 =
    "https://i10a701.p.ssafy.io/oauth2/authorization/kakao";
  const naverLoginURI = "https://i10a701.p.ssafy.io/oauth2/authorization/naver";
  const naverLoginURI2 = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverState}&redirect_uri=${naverRedirectURI}`;

  const kakaoLogin = async () => {
    try {
      const res = await axios.get(kakaoLoginURI2);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-70"
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
          <div className="flex flex-col">
            <a href={kakaoLoginURI}>
              <img
                className="object-cover h-16 w-36 rounded-xl"
                src="assets/kakao_login.png"
                // onClick={kakaoLogin}
              />
            </a>
            <a href={naverLoginURI2}>
              <img
                className="object-cover h-16 w-36 rounded-xl"
                src="assets/naver_login.png"
                // onClick={naverLogin}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
