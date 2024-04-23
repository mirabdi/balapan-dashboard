import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Header } from "../../../components";
import { useStateContext } from "contexts/ContextProvider";
import { hover } from "@syncfusion/ej2-react-schedule";

function OPaymentRootLayout() {
    const { currentColor } = useStateContext();  
    const [hoveredLink, setHoveredLink] = useState(null);
    console.log(hoveredLink)
    const links = [
        {
            'name': 'История',
            'path': 'active',
        },
        {
            'name': 'Новая',
            'path': 'new',
        },
        {
            'name': 'Архив',
            'path': 'archived',
        }
    ];

    const getNavLinkStyle = ({ isActive, path }) => (
        {
            borderBottomColor: isActive || hoveredLink === path ?  currentColor : 'transparent',
            color: isActive || hoveredLink === path ? currentColor : '#4B5563',  
            transition: 'color 200ms, border-bottom-color 200ms', 
        }
    );

    return (
        <>
            <div className="mx-auto max-w-screen-xl bg-white">
                <Header category="Страница" title="Оплаты" />
                <div className="bg-white py-2 px-3 border-b">
                    <nav className="flex flex-wrap gap-4">
                        {links.map((link) => (
                            <NavLink
                                key={link.name}
                                to={`/pos/opay/${link.path}`}
                                onMouseEnter={() => setHoveredLink(link.path)}
                                onMouseLeave={() => setHoveredLink(null)}
                                style={({ isActive }) => getNavLinkStyle({isActive, path: link.path})}
                                className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-2 hover:text-gray-800"
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

export default OPaymentRootLayout;
