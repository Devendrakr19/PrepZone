import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "@mui/material";

const Sidebar = ({ sidebarWidth }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const sidebarData = [
    { id: "1", path: '/dashboard', name: "Dashboard", icon: "home.svg", iconWhite: "home-white.svg" },
    { id: "2", path: "/questionsbank", name: "Questions Bank", icon: "QB_icon.svg", iconWhite: "QB_white.svg" },
    { id: "3", path: "/curriculum", name: "Curriculum Updates", icon: "cu_icon.svg", iconWhite: "cu-white.svg" },
    // { id: "4", path: "/poc", name: "POC", icon: "poc_icon.svg", iconWhite: "poc-white.svg" },
  ];

  return (
    <div className={`shadow ${!sidebarWidth ? "pl-[0px] pr-[0px]" : "px-[0px]"}`}>
      <div className={`bg-[#fff] h-[100vh] rounded-[4px] pt-[20px] pb-[20px] ${!sidebarWidth ? "px-[15px]" : "px-[10px]"}`}>
        <div className="sticky top-0 z-[999] bg-[#fff]">
          <Link to="/dashboard">
            <img
              src='/nimi_logo.svg'
              alt='Nimi logo'
              className={`${!sidebarWidth ? "mx-auto w-[150px] xl:w-[170px]" : "mx-auto w-[70px]"}`}
            />
            {!sidebarWidth && (
              <div className="text-[14px] font-[500] text-[#1C4E80] text-center roboto mt-[10px]">
                National Instructional Media Institute
              </div>
            )}
          </Link>
        </div>

        <div className={`sidebar_menu overflow-y-auto scrollbar_hide mt-[26px] ${!sidebarWidth ? "h-[calc(100vh_-_26vh)]" : "h-[calc(100vh_-_22vh)]"}`}>
          {sidebarData.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-[8px] px-[10px] py-[12px] rounded-[4px] mb-[11px] transition-colors duration-300 ${
                  isActive
                    ? `bg-[#172052] text-white ${!sidebarWidth ? "" : "justify-center"}`
                    : `hover:bg-[#172052] hover:text-white ${!sidebarWidth ? "" : "justify-center"}`
                }`
              }
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setHoveredItem(null)} 
            >
              <Tooltip title={sidebarWidth ? item.name : ""} placement="right" arrow>
                <div className={`flex items-center ${!sidebarWidth ? "" : "justify-center"} gap-[8px]`}>
                  <span className="text-[20px] group-hover:text-white">
                    <img
                      src={
                        hoveredItem === item.id || window.location.pathname === item.path
                          ? `/${item.iconWhite}`
                          : `/${item.icon}`
                      }
                      alt={item.name}
                      className="w-[24px] h-[24px]"
                    />
                  </span>
                  {!sidebarWidth && (
                    <span className="text-[16px] font-normal group-hover:text-white manrope">
                      {item.name}
                    </span>
                  )}
                </div>
              </Tooltip>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;