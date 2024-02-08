import Button from "../ui/Button";
import { conceptList, conceptColorObject } from "../data/concepts";
import { useSelector, useDispatch } from "react-redux";
import { conceptActions } from "../store/conceptSlice";

export default function Concept() {
  const dispatch = useDispatch();
  const conceptColor = useSelector((state) => state.concept.color)
  const clickHandler = (value) => {
    dispatch(conceptActions.changeConcept({ concept: value }));
    console.log(conceptColor);
  };
  
  return (
    <div className="flex justify-between m-3">
      {conceptList.map((value) => {
        const color = conceptColorObject[value];
        return (
          <Button
            onClick={() => clickHandler(value)}
            className={`m-1 w-20 min-w-20 h-20 rounded-lg ${color}} neon-red`}
            key={value}
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
}
