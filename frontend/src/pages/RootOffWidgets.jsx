import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { Fragment } from "react";
import UpperNavbar from "../components/UpperNavBar";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <Fragment>
      <UpperNavbar />
      <div className="flex justify-center h-screen mt-5">
        <div className="w-1/12 mr-8">
        <MainNavigation className="fixed top-0 h-screen"/>
        </div>
        <main className="w-10/12 h-screen bg-slate-200">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}

export default RootLayout;
