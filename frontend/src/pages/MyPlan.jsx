import axios from "axios";
import { useCallback, useState } from "react";

const MyPlan = () => {
  const [pageNo, setPageNo] = useState(0);
  const [planData, setPlanData] = useState([]);

  const getMyPlanList = useCallback(async () => {
    try {
      const res = await axios.get();
    } catch (error) {
      console.log(error);
    }
  });

  return <></>;
};

export default MyPlan;
