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
<<<<<<< HEAD
      <div className="flex justify-center h-screen mt-4 gap-7">
        <div className="w-1/12">
=======
      <div className="flex h-screen gap-6">
        <div className="w-1/12 ml-[1.5rem]">
>>>>>>> feature_writeForm
          <MainNavigation />
        </div>
        <main className="w-7/12 bg-slate-200">
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
