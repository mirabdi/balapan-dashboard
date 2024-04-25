import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function CompanyRootLayout(){
    const inactiveClass = 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue';
    const activeClass = 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue';
    return(
        <>
            {/* <nav className="flex justify-center bg-gray-200 shadow-md py-4">
                <NavLink 
                to="/company/employees/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Сотрудники</NavLink>
                <NavLink 
                to="/company/employee-groups/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Группа Сотрудников</NavLink>
                <NavLink 
                to="/company/stores/" 
                className={({ isActive }) =>
                    isActive ? activeClass : inactiveClass
                }
                >Магазины</NavLink>
            </nav> */}
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Outlet/>
            </div>
        </>
    )
};

export default CompanyRootLayout;