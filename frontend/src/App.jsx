import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import SearchPage from "./pages/Search";
import PlanningPage from "./pages/Planning";
import ApplicantList from "./pages/ApplicantList";
import TripRegisterPage from "./pages/TripResgister";
import TripDetailPage from './pages/TripDetail';
import ChatPage from "./pages/Chat";
import PracticePage from "./pages/PracticeInfinite";
import ChatRoomPage from "./pages/ChatRoom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "register",
        element: <TripRegisterPage />,
      },
      {
        path: "detail",
        element: <TripDetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "applicantList",
        element: <ApplicantList />,
      },
      {
        path: "planning",
        element: <PlanningPage />,
      },
      {
        path: "chatRoomTest",
        element: <ChatPage />,
      },
      {
        path: "chatRoomTest/chat/:chatRoomId",
        element: <ChatRoomPage />,
      },
      {
        path: "practice",
        element: <PracticePage />,
      },
      {
        path: "login/oauth2/code/kakao",
        element: <HomePage />,
      },
      {
        path: "login/oauth2/code/naver",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="font-spoqa">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
