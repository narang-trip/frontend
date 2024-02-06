import { useState } from "react";
import Button from "../ui/Button";

const conceptList = ["낭만", "건축", "모험", "자유", "쇼핑", "휴양", "핫플"];

export default function Concept() {
  const [concept, setConcept] = useState(0);
  console.log(concept);
  return <div className="flex">
    {conceptList.map((value) => {
      return <Button onClick={() => setConcept(value)} className="m-1 w-[12.5%] h-auto rounded-lg" src={`concept/1.jpg`} key={value} height="auto">
        {value}
      </Button>
    })}
    
  </div>
}