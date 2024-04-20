import React from 'react'
import { NavLink } from 'react-router-dom'


const NotificationNavigation = () => {
  return (
    <nav className="flex justify-center bg-gray-200 shadow-md py-4">
        <NavLink 
            to="/crm/notifications/" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Уведомления</NavLink>
        <NavLink 
            to="/crm/notifications/archive/" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Архив</NavLink>
        {/* <NavLink 
            to="/crm/notifications/tags/" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Теги</NavLink> */}
        <NavLink 
            to="/crm/notifications/new/" 
            className={({ isActive }) =>
                isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
            }
            end
        >Добавить уведомление</NavLink>
    </nav>

  )
}

export default NotificationNavigation