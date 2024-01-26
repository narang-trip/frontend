import { NavLink } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { GoHome, GoPersonAdd, GoSearch } from "react-icons/go";
import { LiaCalendarDaySolid } from "react-icons/lia";
import Tooltip from "./ToolTip";

function MainNavigation() {
  return (
    <div className="flex">
      <nav className="flex">
        <ul className="flex-row">
          <Tooltip text="메인화면">
            <li className="flex h-20 mb-[100px] bg-white bg-opacity-0 hover:bg-opacity-100 items-center justify-center">
              <NavLink to="/">
                <GoHome className="mx-auto w-14 h-14" />
              </NavLink>
            </li>
          </Tooltip>
          <li className="bg-white bg-opacity-0 hover:bg-opacity-100">
            <Tooltip text="동행모집작성">
              <NavLink to="/write">
                <PencilSquareIcon className="mx-auto my-8 w-14 h-14" />
              </NavLink>
            </Tooltip>
          </li>
          <li className="bg-white bg-opacity-0 hover:bg-opacity-100">
            <Tooltip text="동행모집검색"> 
              <NavLink to="/search">
                <GoSearch className="mx-auto my-8 w-14 h-14" />
              </NavLink>
            </Tooltip>
          </li>
          <li className="bg-white bg-opacity-0 hover:bg-opacity-100">
            <Tooltip text="신청현황">
              <NavLink to="/applicantList">
                <GoPersonAdd className="mx-auto my-8 w-14 h-14" />
              </NavLink>
            </Tooltip>
          </li>
          <li className="bg-white bg-opacity-0 hover:bg-opacity-100">
            <Tooltip text="여행일정생성">
              <NavLink to="/planning">
                <LiaCalendarDaySolid className="mx-auto my-8 w-14 h-14" />
              </NavLink>
            </Tooltip>
          </li>
          <li>
            <NavLink to="/chatRoomTest">ChatroomTest</NavLink>
          </li>
          <li>
            <NavLink to="/practice">Practice</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
