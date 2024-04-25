import { Outlet, NavLink } from 'react-router-dom';

function ProductRootLayout(){
    return(
        <>
        <nav className="flex justify-center bg-gray-200 shadow-md py-4">
            <NavLink 
                to="/products/" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Товары</NavLink>
            <NavLink 
                to="/products/categories/" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Категории</NavLink>
            <NavLink 
                to="/products/groups/" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Группы товаров</NavLink>
            <NavLink 
                to="/products/groups/new/" 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
            >Добавить группу товаров</NavLink>

        </nav>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Outlet/>
        </div>
        </>
    )
};

export default ProductRootLayout;