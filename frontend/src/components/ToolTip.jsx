import { useState } from "react";

function Tooltip({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      <div
        className={`${
          show ? "visible" : "hidden"
        } absolute mx-auto w-48 h-20 top-0 left-20 py-4 px-6 bg-white rounded text-lg text-neutral-900 font-bold
        `}
      >
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
