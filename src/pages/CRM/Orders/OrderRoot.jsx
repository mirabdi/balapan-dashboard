import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Header, Button } from "components";
import { useStateContext } from "contexts/ContextProvider";


function OrderRootLayout() {
    const { currentColor } = useStateContext();
    const [hoveredLink, setHoveredLink] = useState(null);
    const getNavLinkStyle = ({ isActive, name }) => ({
        borderBottomColor: isActive || hoveredLink === name ? currentColor : 'transparent',
        color: isActive || hoveredLink === name ? currentColor : '#4B5563',
        transition: 'color 300ms, border-bottom-color 300ms',
    });

    const statuses = [
        ["cart", "Корзина"],
        ["ordered", "Оформлен"],
        ["preparing", "Сборка"],
        ["ready", "Готов"],
        ["delivering", "Доставка"],
        ["completed", "Завершен"],
        ["canceled", "Отменен"],
    ];
    const links = [
        {
            'name': 'Все',
            'path': 'all',
        },
        {
            'name': 'Оформлен',
            'path': 'ordered',
        },
        {
            'name': 'Сборка',
            'path': 'preparing',
        },
        {
            'name': 'Готов',
            'path': 'ready',
        },
        {
            'name': 'Доставка',
            'path': 'delivering',
        },
        {
            'name': 'Завершен',
            'path': 'completed',
        },
        {
            'name': 'Отменен',
            'path': 'canceled',
        },
    ];
    return (
        <>
        <div className="mx-auto max-w-screen-xl bg-white">
            <div className="flex justify-between items-center">
                <Header category="Страница" title="Заказы" />
                {/* <Button
                    color="white"
                    bgColor={currentColor}
                    text="+ Заказы"
                    onClick={() => navigate('/app/assortments/new')}
                    borderRadius="10px"
                    className="m-2 font-bold py-2 px-4 rounded"
                /> */}
            </div>
            <div className="m-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-100 p-4 rounded-lg shadow-lg">
                    <p className="text-green-800">Оформлен</p>
                    <p className="font-bold text-lg">1,046</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
                    <p className="text-yellow-800">Сборка</p>
                    <p className="font-bold text-lg">159</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
                    <p className="text-purple-800">Готов</p>
                    <p className="font-bold text-lg">624</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
                    <p className="text-blue-800">Доставка</p>
                    <p className="font-bold text-lg">263</p>
                </div>
            </div>

            <div className="bg-white py-2 px-3 border-b">
                <nav className="flex flex-wrap gap-4">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={`/crm/orders/${link.path}`}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                            style={({ isActive }) => getNavLinkStyle({isActive, name: link.name})}
                            className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-2 hover:text-gray-800"
                            end
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Outlet />
            </div>
        </div>
    </>
    );
}

export default OrderRootLayout;
