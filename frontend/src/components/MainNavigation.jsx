import { NavLink } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

function MainNavigation() {
  return (
    <div>
      <nav className="flex items-center">
        <ul className="mx-8">
          <li className="relative group">
            <NavLink to="/" end>
              <span className="flex items-center text-black opacity-75 group-hover:opacity-100 py-4 pl-6 transition duration-300 ease-in-out">
                <HomeIcon className="w-12 h-12 group-hover:bg-white rounded-l-lg p-2" />
              </span>
            </NavLink>
              <div className="hidden group-hover:block bg-white text-black absolute top-0 right-full p-2 rounded-md">
                Home
              </div>
          </li>
          <li>
            <NavLink to="/write">Write</NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/applicantList">신청자</NavLink>
          </li>
          <li>
            <NavLink to="/planning">Planning</NavLink>
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
