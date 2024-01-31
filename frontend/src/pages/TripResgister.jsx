import { Fragment } from "react";
import RegisterForm from "../components/Trip/Register/TripRegisterForm";

export default function TripRegisterPage() {
  return (
    <Fragment>
        <div className="w-9/12 mx-auto my-5">
          <RegisterForm />
        </div>
    </Fragment>
  );
}
