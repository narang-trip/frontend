import { Fragment } from "react";
import RegisterForm from "../components/Trip/Register/TripRegisterForm";
import { useSelector } from "react-redux";

const TripRegisterPage = () => {
  const { isLogin } = useSelector((state) => state.auth);
  const { conceptColor } = useSelector((state) => state.concept);

  return (
    <Fragment>
      {isLogin ? (
        <div className="my-3">
          <RegisterForm />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-1/2">
          <p
            className={`text-lg font-semibold animate-bounce text-${conceptColor}-400`}
          >
            로그인을 해주세요
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default TripRegisterPage;
