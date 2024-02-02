import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { Fragment } from "react";
import UpperNavbar from "../components/UpperNavBar";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <Fragment>
      <UpperNavbar />
      <MainNavigation/>
      <div className="flex justify-center h-screen mt-5">
        <main className="w-8/12 h-screen text-center">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}

export default RootLayout;
