import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom"

const ConditionalHomeOrRegister = () => {
  const { user } = useContext(AuthContext);
  return user ? <Home /> : <Register />;
};

const ConditionalLoginOrRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : <Login />;
}

const ConditionalRegisterOrRedirect = () => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" /> : <Register />;
}

const router  = createBrowserRouter([
  {
    path: "/" ,
    element: <ConditionalHomeOrRegister/> ,
  },
  {
    path: "/login" ,
    element: <ConditionalLoginOrRedirect/>,
 },
 {
  path: "/register" ,
  element: <ConditionalRegisterOrRedirect/>,
},
{
  path: "/profile/:username" ,
  element: <Profile/>,
},
])


function App() {
  return  (
    <RouterProvider router={router} />
  )
}

export default App;
