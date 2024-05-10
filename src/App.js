import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import ContextProvider from "./context-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <ContextProvider>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ContextProvider>
      </ThemeProvider>
      <ToastContainer theme="dark" />
    </StyledEngineProvider>
  );
};

export default App;
