import { useRef } from "react";
import {
  kakaoApiKey,
  kakaoRedirectUrl,
  naverApikey,
  naverRedirectUrl,
  naverState,
} from "../../../public/apikey";

const LoginModal = (props) => {
  const modalBG = useRef(null);
  const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApiKey}&redirect_uri=${kakaoRedirectUrl}&response_type=code`;
  const naverLoginURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverApikey}&response_type=code&redirect_uri=${naverRedirectUrl}&state=${naverState}`;

  return (
    <div
      className="bg-gray-500 bg-opacity-70 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-0"
      onClick={props.onClose}
      ref={modalBG}
    >
      <div
        className="bg-white px-10 py-4 rounded-3xl w-96 h-82 z-10"
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
            <a href={kakaoLoginURL}>
              <img
                className="w-36 h-16 object-cover rounded-xl"
                src="assets/kakao_login.png"
              />
            </a>
            <button>
              <a href={naverLoginURL}>
                <img
                  className="w-36 h-16 object-cover rounded-xl"
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
