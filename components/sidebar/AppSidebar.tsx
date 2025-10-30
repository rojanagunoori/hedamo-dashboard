"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
//import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../context/SidebarContext";


type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// --- INLINE SVG ICONS ---
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 14h7v7H3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M5.121 17.804A9 9 0 1118.88 17.8M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3" cy="6" r="1" />
    <circle cx="3" cy="12" r="1" />
    <circle cx="3" cy="18" r="1" />
  </svg>
);

const TableIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 20V10m6 10V4m-12 16v-6" />
  </svg>
);

const CubeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const PlugIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 22v-5M9 2v5m6 0V2m5 10H4m7 5h2" />
  </svg>
);

// --- MENU ITEMS ---
const navItems: NavItem[] = [
    { icon: <DashboardIcon />, name: "Dashboard", path: "/" },

  //{ icon: <DashboardIcon />, name: "Dashboard", subItems: [{ name: "Main Dashboard", path: "/" }] },
   { icon: <TableIcon />, name: "Products", path: "/products" },
  { icon: <ListIcon />, name: "Add Product", path: "/add-product" },
  { icon: <ChartIcon />, name: "Analytics", path: "/analytics" },
  { icon: <CalendarIcon />, name: "Calendar", path: "/calendar" },
  { icon: <UserIcon />, name: "User Profile", path: "/profile" },
  { name: "Forms", icon: <ListIcon />, subItems: [{ name: "Form Elements", path: "/form-elements" }] },
  { name: "Tables", icon: <TableIcon />, subItems: [{ name: "Basic Tables", path: "/basic-tables" }] },
];

const othersItems: NavItem[] = [
  { icon: <ChartIcon />, name: "Charts", subItems: [{ name: "Line Chart", path: "/line-chart" }, { name: "Bar Chart", path: "/bar-chart" }] },
  {
    icon: <CubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
    ],
  },
  {
    icon: <PlugIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        nav.subItems?.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({ type: menuType as "main" | "others", index });
            submenuMatched = true;
          }
        });
      });
    });
    if (!submenuMatched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const el = subMenuRefs.current[key];
      if (el) {
        setSubMenuHeight((prev) => ({ ...prev, [key]: el.scrollHeight }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) => (prev?.index === index && prev?.type === menuType ? null : { type: menuType, index }));
  };

  const renderMenuItems = (items: NavItem[], type: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, type)}
              className={`menu-item group ${openSubmenu?.type === type && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"}`}
            >
              {nav.icon}
              {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"}`}
              >
                {nav.icon}
                {(isExpanded || isHovered || isMobileOpen) && <span>{nav.name}</span>}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
             // ref={(el) => (subMenuRefs.current[`${type}-${index}`] = el)}
              style={{
                height: openSubmenu?.type === type && openSubmenu?.index === index ? `${subMenuHeight[`${type}-${index}`]}px` : "0px",
              }}
              className="overflow-hidden transition-all duration-300"
            >
              <ul className="mt-2 ml-8 space-y-1">
                {nav.subItems.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.path}
                      className={`block py-1 text-sm ${isActive(sub.path) ? "text-brand-500 font-medium" : "text-gray-500 hover:text-gray-900"}`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
     // className={`fixed top-0 left-0 h-screen mt-16 bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-all duration-300 z-50
     className={`relative h-[calc(100vh-4rem)] mt-16 bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-all duration-300
      ${isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     <div className="py-8 flex justify-center">
  <Link href="/" className="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="40"
      viewBox="0 0 200 50"
      fill="none"
    >
      <rect width="200" height="50" rx="8" fill="#2563EB" />
      <text
        x="100"
        y="32"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        Hedamo
      </text>
    </svg>
  </Link>
</div>


      <div className="flex flex-col overflow-y-auto no-scrollbar px-4">
        <nav>
          <h2 className="mb-4 text-xs uppercase text-gray-400">{isExpanded || isHovered ? "Menu" : "..."}</h2>
          {renderMenuItems(navItems, "main")}
        </nav>
        <div className="mt-8">
          <h2 className="mb-4 text-xs uppercase text-gray-400">{isExpanded || isHovered ? "Others" : "..."}</h2>
          {renderMenuItems(othersItems, "others")}
        </div>
       
      </div>
    </aside>
  );
};

export default AppSidebar;
