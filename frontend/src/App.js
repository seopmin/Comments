import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layouts/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import MyPage from "./pages/My";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: '/', element: <HomePage /> },
      { path: '/mypage', element: <MyPage /> }
    ]
  }
]);

function App() {

  return <RouterProvider router={router} />;
}

export default App;
