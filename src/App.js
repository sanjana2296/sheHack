import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox"; // Replace with your actual MDBox import
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import Sidenav from "examples/Sidenav"; // Replace with your actual Sidenav import
import Configurator from "examples/Configurator"; // Replace with your actual Configurator import
import routes from "routes"; // Replace with your actual routes import
import brandWhite from "assets/images/logo-ct.png"; // Replace with your actual brandWhite import
import brandDark from "assets/images/logo-ct-dark.png"; // Replace with your actual brandDark import
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context"; // Replace with your actual context imports

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const [showChatBubble, setShowChatBubble] = useState(true); // Show the chat bubble by default

  // Cache for RTL support
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });
    setRtlCache(cacheRtl);
  }, []);

  // Handle opening the configurator when the dog icon is clicked
  const handleConfiguratorOpen = () => {
    setOpenConfigurator(dispatch, !openConfigurator);
  };

  // Handle mouse enter/leave for mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Set the direction for RTL
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Set scroll position to top on route change
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  // Dog icon and chat bubble component
  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      right="2rem" // Position dog icon
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}  // Trigger the same function for the dog icon
    >
      <img
        src="/dog_icon.png"  // Your custom dog image path
        alt="Custom Image"
        style={{
          width: "80px",  // Adjust the image size as needed
          height: "80px",
          objectFit: "cover",
        }}
      />
    </MDBox>
  );

 // Chat bubble component
const chatBubble = showChatBubble && (
  <MDBox
    display="flex"
    flexDirection="column"
    alignItems="center"
    position="fixed"
    right="7rem" // Adjusted to the right to appear next to the dog
    bottom="4rem" // Vertically aligned with the dog
    zIndex={100}
    sx={{
      backgroundColor: "#fff",
      padding: "10px",
      borderRadius: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      maxWidth: "200px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: 'pointer',  // This will change the cursor to pointer when hovering over the chat bubble
    }}
    onClick={handleConfiguratorOpen}  // Trigger the same function for the chat bubble
  >
    <p style={{ marginBottom: "10px", fontSize: "14px", marginRight: "20px" }}>
      How are you feeling today?
    </p>
    <IconButton
      sx={{
        position: "absolute",
        top: "5px",
        right: "5px",
        padding: "0",
      }}
      onClick={() => setShowChatBubble(false)} // Close chat bubble
    >
      <CloseIcon />
    </IconButton>
  </MDBox>
);


  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
              brandName="Material Dashboard 2"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
            {chatBubble} {/* Chat Bubble Component */}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Material Dashboard 2"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
          {chatBubble} {/* Chat Bubble Component */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
