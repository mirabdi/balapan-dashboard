import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {Sidebar, Navbar} from '../components/index';
import ThemeSettings from '../components/ThemeSettings';
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from 'react-icons/fi';
import { useStateContext } from "../contexts/ContextProvider";
import AuthenticationPage from './Authentication';


const RootLayout = () => {
  const { currentMode, activeMenu, currentColor, themeSettings, setThemeSettings, token, checkTokenActive } = useStateContext();
  if(token === null) return <AuthenticationPage/>;
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={()=>setThemeSettings(true)}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                style={{ background: currentColor, borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Settings floating icon */}
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings/>}
              <Outlet/>
            </div>
          </div>
        </div>
    </div>
  );
};

export default RootLayout;
