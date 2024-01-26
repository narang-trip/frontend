const LoginModal = (props) => {
  return (
    <div className="justify-center">
      <button className="" onClick={props.onClose}>
        x
      </button>
      <h3 className="">로 그 인</h3>
      <div className="flex flex-col">
        <button>
          <img
            className="w-36 h-16 object-cover rounded-xl"
            src="assets/kakao_login.png"
          />
        </button>
        <button>
          <img
            className="w-36 h-16 object-cover rounded-xl"
            src="assets/naver_login.png"
          />
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
