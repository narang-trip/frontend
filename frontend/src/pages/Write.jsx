import { Fragment } from "react";
import TripWriteForm from "../components//TripWriteForm/TripWriteForm";

export default function WritePage() {
  return (
    <Fragment>
        <div className="w-10/12 mx-auto my-10">
          <TripWriteForm />
        </div>
    </Fragment>
  );
}
