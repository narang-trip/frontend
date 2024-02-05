import { useRef } from "react";

const LoginModal = (props) => {
  const modalBG = useRef(null);
  const kakaoLoginURL = "https://i10a701.p.ssafy.io/oauth2/authorization/kakao";
  const naverLoginURL = "https://i10a701.p.ssafy.io/oauth2/authorization/naver";

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-0 flex items-center justify-center bg-gray-500 bg-opacity-70"
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
            <a href={kakaoLoginURL}>
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
