import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Widgets from "../components/Widgets";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <div className="flex">
      <header className="w-1/12">
        <MainNavigation />
      </header>
      <main className="w-8/12">
        <Outlet />
      </main>
      <div className="w-3/12">
        <Widgets />
      </div>
    </div>
  );
}

export default RootLayout;
