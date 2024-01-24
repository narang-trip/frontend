import { Fragment } from "react";
import { useInView, InView } from "react-intersection-observer";

const SearchPage = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  return (
    <Fragment>
      <div ref={ref} className="">
        <h2>{`Header inside viewport ${inView}.`}</h2>
      </div>
      <InView
        as="div"
        onChange={(inView, entry) => console.log("Inview:", inView)}
      >
        <h2>
          Plain children are always rendered. Use onChange to monitor state.
        </h2>
      </InView>
    </Fragment>
  );
};

export default SearchPage;
