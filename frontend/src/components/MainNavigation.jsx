import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
          <li>
            <NavLink to="/applicantList">신청자 목록</NavLink>
          </li>
          <li>
            <NavLink to="/planning">Planning</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;







