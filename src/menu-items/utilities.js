// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconCar,
  IconBrandCashapp,
  IconBrandCodesandbox,
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

const utilities = {
  id: "utilities",
  title: "Car Management",
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
      id: "util-modelManagement",
      title: "Model Detail",
      type: "item",
      url: "/modelDetail",
      icon: IconCar,
      breadcrumbs: false,
    },

    // {
    //   id: "util-brandManagement",
    //   title: "Brand Detail",
    //   type: "item",
    //   url: "/brandDetail",
    //   icon: IconBrandCodesandbox,
    //   breadcrumbs: false,
    // },

    {
      id: "util-variantManagement",
      title: "Variant Detail",
      type: "item",
      url: "/variantDetail",
      icon: IconBrandCodesandbox,
      breadcrumbs: false,
    },
  ],
};

export default utilities;
