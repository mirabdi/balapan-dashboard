import React from 'react'
import { NavLink } from 'react-router-dom'


const OrderNavigation = () => {
  return (
    <nav className="flex justify-center bg-gray-200 shadow-md py-4">
        <NavLink 
            to="/crm/orders/active" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Активный</NavLink>
        <NavLink 
            to="/crm/orders/finished/" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Завершен</NavLink>
        <NavLink 
            to="/crm/orders/canceled/" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Отменен</NavLink>
    </nav>

  )
}

export default OrderNavigation