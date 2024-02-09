import ButtonConcept from "../ui/ButtonConcept";
import { conceptList, conceptColorObject } from "../data/concepts";
import { useSelector, useDispatch } from "react-redux";
import { conceptActions } from "../store/conceptSlice";

export default function Concept() {
  const dispatch = useDispatch();
  const {conceptColor} = useSelector((state) => state.concept);
  // console.log(conceptColor);
  const clickHandler = (value) => {
    dispatch(conceptActions.changeConcept({ concept: value }));
    console.log(conceptColor);
  };

  return (
    <div className="flex justify-between mt-3">
      {conceptList.map((value) => {
        const color = conceptColorObject[value];
        return (
          <ButtonConcept
            onClick={() => clickHandler(value)}
            className={`m-1 w-16 min-w-10 h-16 rounded-lg`}
            color={color} 
            key={value}
          >
            {value}
          </ButtonConcept>
        );
      })}
    </div>
  );
}
