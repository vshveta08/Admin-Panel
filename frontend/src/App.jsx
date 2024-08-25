import { LoginPage } from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Super_Admin_HomePage from "./pages/Super_Admin_HomePage";
import Admin_HomePage from "./pages/Admin_HomePage";
import Manager_HomePage from "./pages/Manager_HomePage";
import User_HomePage from "./pages/User_HomePage";
// import HomePage from "./pages/Super_Admin_HomePage";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <AppLayout />,
    //   children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/Super_Admin_HomePage",
          element: <Super_Admin_HomePage />,
        },
        {
          path: "/Admin_HomePage",
          element: <Admin_HomePage />,
        },
        {
          path: "/Manager_HomePage",
          element: <Manager_HomePage />,
        },
        {
          path: "/User_HomePage",
          element: <User_HomePage />,
        },
        
    //   ],
    // },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
