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
      <div className="flex justify-center h-screen mt-4 gap-7">
        <div className="w-20">
          <MainNavigation />
        </div>
        <div className="flex w-11/12">
          <main className="w-9/12 bg-slate-200">
            <Outlet />
          </main>
          <div className="w-3/12 bg-slate-300 ml-2">
            <Widgets />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RootLayout;
