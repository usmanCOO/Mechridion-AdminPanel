// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconCar,
  IconBrandCashapp,
} from "@tabler/icons";

// constant
// const icons = {
//   IconTypography,
//   IconPalette,
//   IconShadow,
//   IconWindmill,
//   IconCarTurbine,
// };

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const services = {
  id: "utilities",
  title: "Car Services",
  type: "group",
  children: [
    // {
    //   id: "util-typography",
    //   title: "Typography",
    //   type: "item",
    //   url: "/utils/util-typography",
    //   icon: icons.IconTypography,
    //   breadcrumbs: false,
    // },
    // {
    //   id: "util-color",
    //   title: "Color",
    //   type: "item",
    //   url: "/utils/util-color",
    //   icon: icons.IconPalette,
    //   breadcrumbs: false,
    // },
    // {
    //   id: "util-shadow",
    //   title: "Shadow",
    //   type: "item",
    //   url: "/utils/util-shadow",
    //   icon: icons.IconShadow,
    //   breadcrumbs: false,
    // },
    // {
    //   id: "icons",
    //   title: "Icons",
    //   type: "collapse",
    //   icon: icons.IconWindmill,
    //   children: [
    //     {
    //       id: "tabler-icons",
    //       title: "Tabler Icons",
    //       type: "item",
    //       url: "/icons/tabler-icons",
    //       breadcrumbs: false,
    //     },
    //     {
    //       id: "material-icons",
    //       title: "Material Icons",
    //       type: "item",
    //       url: "/icons/material-icons",
    //       breadcrumbs: false,
    //     },
    //   ],
    // },

    {
      id: "util-addservices",
      title: "Add Services",
      type: "item",
      url: "/addservices",
      icon: IconCar,
      breadcrumbs: false,
    },
    {
      id: "util-servicesdetail",
      title: "Services Detail",
      type: "item",
      url: "/servicesdetail",
      icon: IconCar,
      breadcrumbs: false,
    },
  ],
};

export default services;
