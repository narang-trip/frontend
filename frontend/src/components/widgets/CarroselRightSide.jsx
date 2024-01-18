import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function CarroselRightSide() {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/Search");
  };
  return (
    <Fragment>
      <img
        src="/assets/travel1.jpg"
        alt="떠나요 여행"
        onClick={onClickHandler}
      />
    </Fragment>
  );
}
