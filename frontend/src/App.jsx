import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import RootLayoutOffWidgets from "./pages/RootOffWidgets";
import ErrorPage from "./pages/Error";
import SearchPage from "./pages/Search";
import PlanningPage from "./pages/Planning";
import ApplicantList from "./pages/ApplicantList";
import WritePage from "./pages/Write";
import ChatPage from "./pages/Chat";
import PracticePage from "./pages/PracticeInfinite";
import ChatRoomPage from "./pages/ChatRoom";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";

const router = createBrowserRouter([
  {
    path: "/Mypage",
    element: <RootLayoutOffWidgets />,
    children: [
      {
        path: "",
        element: <Mypage />,
      },
    ],
  },
  {
    path: "/planning",
    element: <RootLayoutOffWidgets />,
    children: [
      {
        path: "",
        element: <PlanningPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "write",
        element: <WritePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "ApplicantList",
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
        path: "Mypage",
        element: <Mypage />,
      },
      {
        path: "login/oauth2/code/kakao",
        element: <Login />,
      },
      {
        path: "login/oauth2/code/naver",
        element: <Login />,
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
