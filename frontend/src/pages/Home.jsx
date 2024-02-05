import Button from "../ui/Button";
import Concept from "../components/Concept";
import TripList from "../components/TripList";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    axios
      .get("/api/user/get")
      .then((response) => {
        console.log(response);
      })
      .then((error) => {
        console.log(error);
      });
  };

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
