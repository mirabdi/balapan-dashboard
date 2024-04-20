import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function OrderRootLayout(){
    // structure:
    // navigation - active, finished, canceled
    // outlet 

    const statuses = [
        ['cart', 'Корзина'],
        ['ordered', 'Оформлен'],
        ['preparing', 'Сборка'],
        ['ready', 'Готов'],
        ['delivering', 'Доставка'],
        ['completed', 'Завершен'],
        ['canceled', 'Отменен'],
      ];
    return(
        <>
        <nav className="flex justify-center bg-gray-200 shadow-md py-4">
            {statuses.map(([statusKey, statusLabel]) => (
                <NavLink
                key={statusKey}
                to={`/crm/orders/${statusKey}/`} 
                className={({ isActive }) =>
                    isActive ? 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue' : 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue'
                }
                end
                >
                {statusLabel}
                </NavLink>
            ))}
        </nav>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Outlet/>
        </div>
        </>
    )
};

export default OrderRootLayout;