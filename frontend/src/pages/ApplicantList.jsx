import { Fragment, useState } from "react";
import { RiUserReceivedLine, RiUserSharedLine } from "react-icons/ri";
import ReceivedRequests from "../components/Application/ReceivedRequests";
import SentRequests from "../components/Application/SentRequests";

export default function ApplicantList() {
  // 받은 요청 목록인지, 보낸 요청 목록인지 확인
  const [selectedOption, setSelectedOption] = useState("received");

  // 누른 옵션에 따라 selectedOption 값 설정
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <Fragment>
      <div>
      <div className="flex flex-row p-6 justify-evenly">
        <div
          className={`flex flex-row rounded-3xl p-3 hover:font-semibold ${
            selectedOption === "received"
              ? " bg-amber-300  font-semibold"
              : " bg-stone-300 "
          }`}
          onClick={() => handleOptionChange("received")}
        >
          <RiUserReceivedLine className="mx-3 " size="24" />
          <button className="text-sm">받은 요청 목록</button>
        </div>
        <div
          className={`flex flex-row rounded-3xl p-3 hover:font-semibold ${
            selectedOption === "sent"
              ? " bg-amber-300 font-semibold"
              : " bg-stone-300 "
          }`}
          onClick={() => handleOptionChange("sent")}
        >
          <RiUserSharedLine className="mx-3 " size="24" />
          <button className="text-sm">보낸 요청 목록</button>
        </div>
      </div>
      {selectedOption === "received" && <ReceivedRequests />}
      {selectedOption === "sent" && <SentRequests />}
      </div>
    </Fragment>
  );
}
