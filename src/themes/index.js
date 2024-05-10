// import { createTheme } from "@mui/material/styles";

// // assets
// import colors from "assets/scss/_themes-vars.module.scss";

// // project imports
// import componentStyleOverrides from "./compStyleOverride";
// import themePalette from "./palette";
// import themeTypography from "./typography";

// /**
//  * Represent theme style and structure as per Material-UI
//  * @param {JsonObject} customization customization parameter object
//  */

// export const theme = (customization) => {
//   const color = colors;

//   const themeOption = {
//     colors: color,
//     heading: color.grey900,
//     paper: color.paper,
//     backgroundDefault: color.paper,
//     background: color.primaryLight,
//     darkTextPrimary: color.grey700,
//     darkTextSecondary: color.grey500,
//     textDark: color.grey900,
//     menuSelected: color.secondaryDark,
//     menuSelectedBack: color.secondaryLight,
//     divider: color.grey200,
//     mode: "dark",
//     customization,
//   };

//   const themeOptions = {
//     direction: "ltr",
//     palette: themePalette(themeOption),
//     mixins: {
//       toolbar: {
//         minHeight: "48px",
//         padding: "16px",
//         "@media (min-width: 600px)": {
//           minHeight: "48px",
//         },
//       },
//     },
//     typography: themeTypography(themeOption),
//   };

//   const themes = createTheme(themeOptions);
//   themes.components = componentStyleOverrides(themeOption);

//   return themes;
// };

// export default theme;

import { createTheme } from "@mui/material/styles";
import themePalette from "./palette";
import themeTypography from "./typography";
export const theme = (customization) => {
  const themeOption = {
    heading: "#FFFFFF",
    paper: "#FFFFFF",
    backgroundDefault: "#FFFFFF",
    background: "#212121",
    darkTextPrimary: "#424242",
    darkTextSecondary: "#757575",
    textDark: "#212121",
    menuSelected: "#3F51B5",
    menuSelectedBack: "#E8EAF6",
    divider: "#EEEEEE",
    customization,
  };
  const themeOptions = {
    // direction: "ltr",
    palette: {
      mode: "dark",
      primary: {
        main: themeOption.background,
      },
      secondary: {
        main: themeOption.menuSelected,
      },
    },
    mixins: {
      toolbar: {
        minHeight: "48px",
        padding: "16px",
        "@media (min-width: 600px)": {
          minHeight: "48px",
        },
      },
    },
    typography: themeTypography(themeOption),
  };
  const themes = createTheme(themeOptions);
  return themes;
};
export default theme;
