import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function AppRootLayout(){
    const inactiveClass = 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue';
    const activeClass = 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue';
    return(
        <>
            <nav className="flex justify-center bg-gray-200 shadow-md py-4">
                <NavLink 
                to="/app/assortments/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Ассортименты</NavLink>
                <NavLink 
                to="/app/listings/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Листинги</NavLink>
                <NavLink 
                    to="/app/posts/" 
                    className={({ isActive }) =>
                        isActive ? activeClass : inactiveClass
                    }
                    // end
                >Посты</NavLink>
                <NavLink 
                to="/app/banners/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Баннеры</NavLink>

                <NavLink 
                to="/app/brands/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Бренды</NavLink>
            </nav>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Outlet/>
            </div>
        </>
    )
};

export default AppRootLayout;