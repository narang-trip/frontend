import { Fragment } from "react";
import TripWriteForm from "../components//TripWriteForm/TripWriteForm";

export default function WritePage() {
  return (
    <Fragment>
        <div className="w-9/12 mx-auto my-5">
          <TripWriteForm />
        </div>
    </Fragment>
  );
}
