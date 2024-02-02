import { Fragment } from "react";
import RegisterForm from "../components/Trip/Register/TripRegisterForm";

export default function TripRegisterPage() {
  return (
    <Fragment>
        <div className="w-full mx-0 my-3">
          <RegisterForm />
        </div>
    </Fragment>
  );
}
