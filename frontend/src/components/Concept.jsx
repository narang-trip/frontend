import { useState } from "react";

const conceptImage = [0, 1, 2, 3, 4, 5, 6];

export default function Concept() {
  const [concept, setConcept] = useState(0);
  console.log(concept);
  return <div className="flex">
    {conceptImage.map((value) => {
      return <img onClick={() => setConcept(value)} className="m-1" src={`concept/${value}.jpg`} key={value} width="12.5%" height="auto"/>
    })}
    
  </div>
}