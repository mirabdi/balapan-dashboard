import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Header, Button } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";

function OrderRootLayout() {
    const { currentColor, showToast, token } = useStateContext();
    const [hoveredLink, setHoveredLink] = useState(null);
    const [ stats, setStats ] = useState({ordered: 0, preparing: 0, ready: 0, delivering: 0, completed: 0, canceled: 0});
    const getNavLinkStyle = ({ isActive, name }) => ({
        borderBottomColor: isActive || hoveredLink === name ? currentColor : 'transparent',
        color: isActive || hoveredLink === name ? currentColor : '#4B5563',
        transition: 'color 300ms, border-bottom-color 300ms',
    });
    const loadStats = async () => {
        try {
            const response = await fetch(BASE_URL + "/crm/admin-api/orders/stats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + token,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                showToast({
                    title: "Error!",
                    content: data.message,
                    cssClass: "e-toast-danger",
                    icon: "e-error toast-icons",
                });
                return;
            }
            const data = await response.json();
            setStats(data.response);
        } catch (error) {
            showToast({
                title: "Error!",
                content: "Failed to load order stats.",
                cssClass: "e-toast-danger",
                icon: "e-error toast-icons",
            });
        }
    };

    
    useEffect(async () => {
        if (token) {
            loadStats();
        }
    }, [token]);

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
            </div>
            <div className="m-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-100 p-4 rounded-lg shadow-lg">
                    <p className="text-green-800">Оформлен</p>
                    <p className="font-bold text-lg">{stats.ordered ? stats.ordered : 0}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
                    <p className="text-yellow-800">Сборка</p>
                    <p className="font-bold text-lg">{stats.preparing ? stats.preparing : 0}</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
                    <p className="text-purple-800">Готов</p>
                    <p className="font-bold text-lg">{stats.ready ? stats.ready : 0}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
                    <p className="text-blue-800">Доставка</p>
                    <p className="font-bold text-lg">{stats.delivering ? stats.delivering : 0}</p>
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
