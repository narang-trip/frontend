import Button from "../ui/Button";
import Concept from "../components/Concept";
import TripList from "../components/TripList";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  // useEffect(() => {
  //   getUser();
  // });

  // const getUser = () => {
  //   axios
  //     .get("/api/user/get")
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  (async () => {
    try {
      const res = await axios.post(
        `https://i10a701.p.ssafy.io/api/user/login/oauth/kakao?code=355`
      );
      console.log(res.data);
      // dispatch(authAction.Login(code));

    } catch (error) {
      console.log(error);
    }
  })();

  return (
    <div>
      sse 테스트 중
      <img
        src="/assets/travelBanner.jpg"
        className="object-cover w-full h-40"
      />
      <Concept />
      <TripList />
    </div>
  );
}
