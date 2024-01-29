import { useRef } from "react";

const LoginModal = (props) => {
  const modalBG = useRef(null);

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
            <button>
              <a href="/oauth2/authorization/kakao">
                <img
                  className="w-36 h-16 object-cover rounded-xl"
                  src="assets/kakao_login.png"
                />
              </a>
            </button>
            <button>
              <a href="/oauth2/authorization/naver">
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
