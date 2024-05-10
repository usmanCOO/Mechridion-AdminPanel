import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import Protected from "views/protected";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

const UtilsAddCustomer = Loadable(
  lazy(() => import("views/utilities/Addcustomer"))
);

const UtilsPaymentDetail = Loadable(
  lazy(() => import("views/utilities/Paymentdetail"))
);
const UtilsModelManagement = Loadable(
  lazy(() => import("views/utilities/ModelManagement"))
);

const UtilsBrandManagement = Loadable(
  lazy(() => import("views/utilities/BrandManagement"))
);

const UtilsVariantManagement = Loadable(
  lazy(() => import("views/utilities/VariantManagement"))
);
const UtilsUserDetails = Loadable(
  lazy(() => import("views/utilities/Userdetails"))
);

const UtilsAddServices = Loadable(
  lazy(() => import("views/utilities/Addservices"))
);

const UtilsServiceDetails = Loadable(
  lazy(() => import("views/utilities/Servicesdetail"))
);

const UtilsUpdateServices = Loadable(
  lazy(() => import("views/utilities/Updateservices"))
);

const UtilsUpdateCustomer = Loadable(
  lazy(() => import("views/utilities/Updatecustomer"))
);

// const UtilsTypography = Loadable(
//   lazy(() => import("views/utilities/Typography"))
// );
// const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
// const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
// const UtilsMaterialIcons = Loadable(
//   lazy(() => import("views/utilities/MaterialIcons"))
// );
// const UtilsTablerIcons = Loadable(
//   lazy(() => import("views/utilities/TablerIcons"))
// );

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Protected Component={MainLayout} />,

  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    // {
    //   path: "dashboard",
    //   children: [
    //     {
    //       path: "default",
    //       element: <DashboardDefault />,
    //     },
    //   ],
    // },
    {
      path: "modelDetail",
      element: <UtilsModelManagement />,
    },

    {
      path: "brandDetail",
      element: <UtilsBrandManagement />,
    },

    {
      path: "variantDetail",
      element: <UtilsVariantManagement />,
    },

    {
      path: "addcustomerdetail",
      element: <Protected Component={UtilsAddCustomer} />,
    },

    {
      path: "paymentdetail",
      element: <Protected Component={UtilsPaymentDetail} />,
    },

    {
      path: "updatecustomerdetail",
      element: <Protected Component={UtilsUpdateCustomer} />,
    },

    {
      path: "addservices",
      element: <Protected Component={UtilsAddServices} />,
    },
    {
      path: "updateservices",
      element: <Protected Component={UtilsUpdateServices} />,
    },

    // {
    //   path: "updateservices",
    //   element: <UtilsUpdateServices />,
    // },

    {
      path: "servicesdetail",
      element: <UtilsServiceDetails />,
    },

    {
      path: "userDetails",
      element: <Protected Component={UtilsUserDetails} />,
    },
  ],
};

export default MainRoutes;
