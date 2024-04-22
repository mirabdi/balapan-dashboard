import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { BASE_URL } from "data/config";
const StateContext = createContext();

const initialNavbarState = {
  chart: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  console.log("ContextProvider", Math.random());
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
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
  useEffect(() => {
    checkTokenActive();
  }, []);

  const checkTokenActive = async () => {
    if (token === null) return;
    try {
      const response = await fetch(`${BASE_URL}/admin-api/auth/check`, {
        headers: { Authorization: `Token ${token}` }
      });
      if (!response.ok) throw new Error('Token validation failed');
      const data = await response.json();
      const userData = data.response;
      setUser(userData);
    } catch (error) {
      console.error('Token check failed:', error);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${BASE_URL}/admin-api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok){
        showToast({ title: 'Login Error', content: 'Invalid username or password', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        throw new Error('Login failed');
      } 
      const data = await response.json();
      const userData = data.response;
      const token = userData.token;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(userData);
    } catch (error) {
      showToast({ title: 'Login Error', content: error.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        checkTokenActive,
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
