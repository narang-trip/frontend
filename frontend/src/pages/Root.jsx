import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Widgets from "../components/widgets/Widgets";
import { Fragment } from "react";
import UpperNavbar from "../components/UpperNavBar";

function RootLayout() {
  // const navigation = useNavigation();


  return (
    <Fragment>
        <UpperNavbar/>
      <div className="flex">
        <div className="w-1/12 flex bg-slate-400">
          <MainNavigation />
        </div>
        <main className="w-8/12 bg-slate-200">
          <Outlet />
        </main>
        <div className="w-3/12 bg-slate-300">
          <Widgets />
        </div>
      </div>
    </Fragment>
  );
}

export default RootLayout;
