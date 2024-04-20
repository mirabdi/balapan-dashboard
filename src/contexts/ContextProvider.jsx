import React, { createContext, useContext, useState, useRef } from "react";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
const StateContext = createContext();

const initialNavbarState = {
  chart: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  console.log("ContextProvider", Math.random());
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [rightModal, setRightModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [navbarState, setNavbarState] = useState(initialNavbarState);
  const toastRef = useRef(null);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) => {
    console.log(clicked);
    setNavbarState({ ...initialNavbarState, [clicked]: true });
  };
  
  const showToast = (options) => {
    if (options == 'success') {
      options = {
        title: 'Success!',
        content: 'Your message has been sent successfully.',
        cssClass: 'e-toast-success',
        icon: 'e-success toast-icons',
      };
    }
    if (options == 'warning') {
      options = {
        title: 'Warning!',
        content: 'There was a problem with your network connection.',
        cssClass: 'e-toast-warning',
        icon: 'e-warning toast-icons',
      };
    }
    if (toastRef.current) {
      toastRef.current.show(options);
    }
  };

  const hideToast = () => {
    if (toastRef.current) {
      toastRef.current.hide('All');
    }
  };
  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        navbarState,
        initialNavbarState,
        setNavbarState,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        rightModal,
        setRightModal,
        showToast,
        hideToast,
      }}
    >
      <ToastComponent ref={toastRef} position={{ X: 'Left', Y: 'Bottom' }} />
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
