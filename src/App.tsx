import { createBrowserRouter } from "react-router-dom";

import { Home } from './pages/home';
import { Login } from "./pages/login"; 
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { NewPet } from "./pages/dashboard/newPet";
import { PetDatails } from "./pages/datailsPet";
import { PrivacyPolicy } from "./pages/policyPrivacy";
import { About } from "./pages/about";
import { ForgotPassword } from "./pages/changePassword"
import { ResetPassword } from "./pages/resetPassoword";



import { Layout } from "./components/layout";

import { Private } from "./routes/Private";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element:<Home/>
      },
      {
        path: "/pet/:id",
        element: <PetDatails/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy/>
      },
      {
        path: "/dashboard",
        element: <Private> <Dashboard/> </Private> 
      },
      {
        path: "dashboard/new",
        element: <Private><NewPet/></Private> 
      },
      
    ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/>
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
  }

])


export {router};