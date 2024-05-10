// assets
import { IconKey, IconUser } from "@tabler/icons";

// constant
const icons = {
  IconKey,
  IconUser,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  title: "Admin Management",
  //   caption: "Pages Caption",
  type: "group",
  children: [
    {
      id: "util-userDetails",
      title: "User details",
      type: "item",
      url: "/userDetails",
      icon: icons.IconUser,
      breadcrumbs: false,
    },
    // {
    //   id: "authentication",
    //   title: "Authentication",
    //   type: "collapse",
    //   icon: icons.IconKey,

    //   children: [
    //     {
    //       id: "login3",
    //       title: "Login",
    //       type: "item",
    //       url: "/login",
    //       target: true,
    //     },
    //     {
    //       id: "register3",
    //       title: "Register",
    //       type: "item",
    //       url: "/register",
    //       target: true,
    //     },
    //   ],
    // },
  ],
};

export default pages;
