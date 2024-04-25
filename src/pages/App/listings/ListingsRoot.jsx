import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";
import { Header, Button } from "components";

function ListingsRootLayout() {
    const { currentColor } = useStateContext();
    const [hoveredLink, setHoveredLink] = useState(null);
    const navigate = useNavigate();

    const getNavLinkStyle = ({ isActive, name }) => ({
        borderBottomColor: isActive || hoveredLink === name ? currentColor : 'transparent',
        color: isActive || hoveredLink === name ? currentColor : '#4B5563',
        transition: 'color 1000ms, border-bottom-color 1000ms',
    });

    const links = [
        {
            'id': 'active',
            'name': 'Активные',
            'path': '',
        },
        {
            'id': 'archived',
            'name': 'Архив',
            'path': 'archived',
        },
        {
            'id': 'new',
            'name': 'Добавить листинг',
            'path': 'new',
        },
    ];

    return (
        <>
        <div className="mx-auto max-w-screen-xl bg-white">
            <div className="flex justify-between items-center">
                <Header category="Страница" title="Листинги" />
                <Button
                    color="white"
                    bgColor={currentColor}
                    text="+ Листинг"
                    onClick={() => navigate('/app/listings/new')}
                    borderRadius="10px"
                    className="m-2 font-bold py-2 px-4 rounded"
                />
            </div>
            <div className="bg-white py-2 px-3 border-b">
                <nav className="flex flex-wrap gap-4">
                    {links.map((link) => (
                        <NavLink
                            key={link.name}
                            to={`/app/listings/${link.path}`}
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

export default ListingsRootLayout;
