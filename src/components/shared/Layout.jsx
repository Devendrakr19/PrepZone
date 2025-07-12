import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [sidebarWidth, setSidebarWidth] = useState(false);
    const toggleSidebarWidth = () => setSidebarWidth(!sidebarWidth);

    return (
        <div className='p-[20px] h-screen overflow-hidden'>
            <div
                className={`whole_panel grid transition-[grid-template-columns] duration-[0.3s] ease-[ease] ${!sidebarWidth
                    ? "grid-cols-[200px_1fr] xxl:grid-cols-[379px_1fr] 2xl:grid-cols-[320px_1fr]"
                    : "grid-cols-[70px_1fr] 2xl:grid-cols-[100px_1fr]"
                    }`}
            >
                <div className="sticky top-0">
                    <Sidebar sidebarWidth={sidebarWidth} />
                </div>
                <div className="pl-[15px] pr-[0px] overflow-x-auto">
                    <Header toggleSidebarWidth={toggleSidebarWidth} />
                    <div className="components h-[calc(100vh_-_80px)] pb-[18px] overflow-x-auto scrollbar_hide">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
