import TripDetail from "../Trip/Read/TripDetail";

const SmallPlan = (props) => {
  const dates = props.dates;
  console.log(dates[1]);
  const plans = [];
  if (dates[1] !== null) {
    plans.push([], []);
  }
  console.log(plans);
  // 날짜 포함하면
  return (
    <div className="w-3/5 p-2 overflow-auto border-black rounded-lg shadow-xl scroll-auto">
      {plans.map((paln, index) => (
        <div key={index}>
          <TripDetail />
        </div>
      ))}
    </div>
  );
};

export default SmallPlan;
``;
