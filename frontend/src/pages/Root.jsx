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
      <MainNavigation />
      <div className="flex justify-center h-screen gap-10 mt-5 ml-32 ">
        <main className="w-7/12 h-screen">
          <Outlet />
        </main>
        <div className="w-3/12 h-screen bg-stone-100">
          <Widgets />
        </div>
      </div>
    </Fragment>
  );
}

export default RootLayout;
