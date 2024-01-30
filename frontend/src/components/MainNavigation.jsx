import { NavLink } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { GoHome, GoPersonAdd, GoSearch } from "react-icons/go";
import { LiaCalendarDaySolid } from "react-icons/lia";
import Tooltip from "./ToolTip";

function MainNavigation() { 
  return (
    <div className="flex flex-col items-center h-screen justify-evenly bg-stone-400 rounded-[4.5rem]">
      <nav>
      <ul className="flex flex-col items-center justify-between h-screen py-20 mx-auto list-none">
        <li>
          <Tooltip text="메인화면">
            <div>
            <NavLink to="/" className="flex items-center justify-center w-16 h-16 rounded-l-full hover:bg-stone-100 focus:bg-stone-100 focus:bg-opacity-30 active:bg-stone-100 active:bg-opacity-30">
              <GoHome className="w-[2rem] h-[2rem] mx-auto" />
            </NavLink>
            </div>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="동행모집작성">
            <NavLink to="/write" className="flex items-center justify-center w-16 h-16 rounded-lg hover:bg-stone-100 hover:bg-opacity-30 focus:bg-stone-100 focus:bg-opacity-30 active:bg-stone-100 active:bg-opacity-30">
              <PencilSquareIcon className="w-[2rem] h-[2rem] mx-auto" />
            </NavLink>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="동행모집검색">
            <NavLink to="/search" className="flex items-center justify-center w-16 h-16 rounded-lg hover:bg-stone-100 hover:bg-opacity-30 focus:bg-stone-100 focus:bg-opacity-30 active:bg-stone-100 active:bg-opacity-30">
              <GoSearch className="w-[2rem] h-[2rem] mx-auto" />
            </NavLink>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="신청현황">
            <NavLink to="/applicantList" className="flex items-center justify-center w-16 h-16 rounded-lg hover:bg-stone-100 hover:bg-opacity-30 focus:bg-stone-100 focus:bg-opacity-30 active:bg-stone-100 active:bg-opacity-30">
              <GoPersonAdd className="w-[2rem] h-[2rem] mx-auto" />
            </NavLink>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="여행일정생성">
            <NavLink to="/planning" className="flex items-center justify-center w-16 h-16 rounded-lg hover:bg-stone-100 hover:bg-opacity-30 focus:bg-stone-100 focus:bg-opacity-30 active:bg-stone-100 active:bg-opacity-30">
              <LiaCalendarDaySolid className="w-[2rem] h-[2rem] mx-auto" />
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