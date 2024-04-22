import { Outlet, NavLink } from "react-router-dom";

function EmployeeGroupsRootLayout() {
    return (
        <>
            <nav className="flex justify-center bg-gray-200 shadow-md py-4">
                <NavLink
                    to="/company/employee-groups/"
                    className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                    }
                    end
                >
                    Активные
                </NavLink>
                <NavLink
                    to="/company/employee-groups/new"
                    className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                    }
                >
                    Добавить Группу
                </NavLink>
                <NavLink
                    to="/company/employee-groups/archived"
                    className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                    }
                >
                    Архив
                </NavLink>
            </nav>
            
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Outlet />
            </div>
        </>
    );
}

export default EmployeeGroupsRootLayout;
