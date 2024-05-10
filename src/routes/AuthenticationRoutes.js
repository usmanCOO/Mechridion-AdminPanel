import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Register3"))
);

const AuthEmail = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Email3"))
);

const Otp = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Otp3"))
);

const ResetPassword = Loadable(
  lazy(() =>
    import("views/pages/authentication/authentication3/ResetPassword3")
  )
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/login",
      element: <AuthLogin3 />,
    },
    {
      path: "/register",
      element: <AuthRegister3 />,
    },

    {
      path: "/email",
      element: <AuthEmail />,
    },

    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/resetpassword",
      element: <ResetPassword />,
    },
  ],
};

export default AuthenticationRoutes;
