import React from 'react';
import { NavLink } from 'react-router-dom';

const PartiesNavigation = () => {
  return (
    <nav className="flex justify-center bg-gray-200 shadow-md py-4">
      <NavLink 
          to="/parties/clients/" 
          className={({ isActive }) =>
              isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
          }
          end
      >Клиенты</NavLink>
      <NavLink 
          to="/parties/suppliers/" 
          className={({ isActive }) =>
              isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
          }
          end
      >Поставщики</NavLink>
      <NavLink 
          to="/parties/clients/groups/" 
          className={({ isActive }) =>
              isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
          }
          end
      >Группы клиентов</NavLink>
      <NavLink 
          to="/parties/suppliers/groups/" 
          className={({ isActive }) =>
              isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
          }
          end
      >Группы поставщиков</NavLink>
    </nav>
  );
};

export default PartiesNavigation;
