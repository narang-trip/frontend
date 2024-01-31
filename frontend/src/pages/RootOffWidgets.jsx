import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { Fragment } from "react";
import UpperNavbar from "../components/UpperNavBar";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <Fragment>
      <UpperNavbar />
      <div className="flex justify-center h-screen mt-4 gap-7">
        <div className="w-1/12">
          <MainNavigation />
        </div>
        <main className="w-10/12 bg-slate-200">
          <Outlet />
        </main>
      </div>
    </Fragment>
  );
}

export default RootLayout;
