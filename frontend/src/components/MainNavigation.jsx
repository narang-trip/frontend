import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <div>
      <nav className=" flex items-center" >
        <ul className="text-center">
          <li className="mb-[400px]">
            <NavLink to="/" end>
              Home
            </NavLink>
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
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
