import { Fragment } from "react";
import RegisterForm from "../components/Trip/Register/TripRegisterForm";

const TripRegisterPage = () => {
  return (
    <Fragment>
        <div className="my-3">
          <RegisterForm />
        </div>
    </Fragment>
  );
}

export default TripRegisterPage