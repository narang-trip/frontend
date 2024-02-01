import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Widgets from "../components/widgets/Widgets";
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
        <main className="w-7/12 bg-stone-50">
          <Outlet />
        </main>
        <div className="w-3/12 bg-stone-100">
          <Widgets />
        </div>
      </div>
    </Fragment>
  );
}

export default RootLayout;
