import React from 'react'
import { NavLink } from 'react-router-dom'


const ProductsNavigation = () => {
  return (
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
  )
}

export default ProductsNavigation