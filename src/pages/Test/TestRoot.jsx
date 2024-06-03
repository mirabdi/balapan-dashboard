import { Outlet, NavLink } from 'react-router-dom';

function TestRootLayout(){
    return(
        <>
        <nav className="flex justify-center bg-gray-200 shadow-md py-4">
            <NavLink 
                to="/test/1" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Test 1</NavLink>
            <NavLink 
                to="/test/2/" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Test 2</NavLink>
            <NavLink 
                to="/test/3" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Test 3</NavLink>
            <NavLink 
                to="/test/4" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Test 4</NavLink>

        </nav>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Outlet/>
        </div>
        </>
    )
};

export default TestRootLayout;