import { useState } from "react";

function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      <div
        className={`${ show ? "visible" : "hidden"} absolute w-40 h-14 top-0 left-20 bg-white text-ml rounded`}
      >
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
