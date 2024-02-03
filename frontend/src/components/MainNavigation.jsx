import { NavLink } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { GoHome, GoPersonAdd, GoSearch } from "react-icons/go";
import { LiaCalendarDaySolid } from "react-icons/lia";

function MainNavigation() {

  return (
    <div className="fixed left-0 flex flex-col items-center w-[12rem] h-screen top-19">
      <nav>
        <ul className="flex flex-col items-start h-screen py-10 mx-auto list-none justify-normal">
          <li className="duration-300 py-7">
            <NavLink
              to="/"
              tabIndex="0"
              className="flex items-center justify-center hover:text-amber-500 hover:font-bold focus:font-bold focus:text-amber-500"
            >
              <GoHome className="w-6 h-6 ml-0 mr-3" />
              <span className="text-base text-nowrap ">홈</span>
            </NavLink>
          </li>
          <li className="transition-all duration-300 py-7">
            <NavLink
              to="/register"
              className="flex items-center justify-center hover:text-amber-500 hover:font-bold focus:font-bold focus:text-amber-500"
            >
              <PencilSquareIcon className="w-6 h-6 ml-0 mr-3" />
              <span className="text-base text-nowrap">동행 작성</span>
            </NavLink>
          </li>
          <li className="transition-all duration-300 py-7">
            <NavLink
              to="/search"
              className="flex items-center justify-center hover:text-amber-500 hover:font-bold focus:font-bold focus:text-amber-500"
            >
              <GoSearch className="w-6 h-6 ml-0 mr-3" />
              <span className="text-base text-nowrap">동행 검색</span>
            </NavLink>
          </li>
          <li className="transition-all duration-300 py-7">
            <NavLink
              to="/applicantList"
              className="flex items-center hover:text-amber-500 hover:font-bold focus:font-bold focus:text-amber-500"
            >
              <GoPersonAdd className="w-6 h-6 ml-0 mr-3" />
              <span className="text-base text-nowrap">신청 현황</span>
            </NavLink>
          </li>
          <li className="transition-all duration-300 py-7">
            <NavLink
              to="/planning"
              className="flex items-center hover:text-amber-500 hover:font-bold focus:font-bold focus:text-amber-500"
            >
              <LiaCalendarDaySolid className="w-6 h-6 ml-0 mr-3" />
              <span className="text-base text-nowrap">여행 계획</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/chatRoomTest">ChatroomTest</NavLink>
          </li>
          <li>
            <NavLink to="/practice">Practice</NavLink>
          </li>
          <li>
            <NavLink to="/Mypage">Myapge</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
