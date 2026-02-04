// src/components/LeftDashboard.js (FINAL POLISHED VERSION)
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import {
  Users,
  CreditCard,
  Box,
  Store,
  Tag,
  Ticket,
  Presentation,
  ShieldHalf,
  Settings,
  LayoutDashboard,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowRightLeft,
  BadgeCheck,
  ClipboardClock,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  {
    name: "User Management",
    icon: Users,
    href: "/users",
    submenu: [
      { name: "Buyers", icon: Store, href: "/users?type=buyers" },
      { name: "Creators", icon: Users, href: "/users?type=creators" },
      { name: "Brands", icon: Tag, href: "/users?type=brands" },
    ],
  },
  { name: "Storefront Management", icon: Store, href: "/storefronts" },
  // { name: "Campaign Management", icon: Presentation, href: "/capaignfronts" },
  { name: "Product Listings", icon: Box, href: "/products" },
  { name: "Referral Campaign", icon: Presentation, href: "/referalCampaign" },
  { name: "Orders & Transactions", icon: ArrowRightLeft, href: "/orders" },
  { name: "Pay-outs", icon: CreditCard, href: "/payouts" },
  // { name: "Ticket", icon: Ticket, href: "/ticket" },
  {
    name: "Support Tickets",
    icon: BadgeCheck,
    href: "/supportTickets", // This will be adjusted in useEffect for Super Admins
  },
  {
    name: "Role Management",
    icon: ShieldHalf,
    href: "/roleManagement",
  },
  { name: "System Logs", icon: ClipboardClock, href: "/logs" },
  { name: "General Settings", icon: Settings, href: "/settings" },
];

const PRIMARY_BG = "#1e1b4a";
const ACTIVE_TEXT_COLOR = "#8937ce";
const DASHBOARD_ACTIVE_BG = "white";
const COLLAPSED_WIDTH = "4.5rem";
const EXPANDED_WIDTH = "16rem";

const NavItem = ({ item, isCollapsed }) => {
  const Icon = item.icon;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isParent = !!item.submenu;

  // Construct full path with search params
  const fullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  // Check if any submenu item is active
  const activeSub = isParent
    ? item.submenu.find((s) => {
        // FIXED: Extract pathname and type param from submenu href
        const [subPath, subQuery] = s.href.split("?");
        const subParams = new URLSearchParams(subQuery);
        const subType = subParams.get("type");
        const currentType = searchParams.get("type");

        // Match if pathname matches AND type param matches
        return pathname === subPath && subType === currentType;
      })
    : null;

  // FIXED: Parent should NEVER be highlighted, only submenu items
  const isActive = isParent
    ? false // Parent never highlighted
    : fullPath === item.href || pathname === item.href;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Keep submenu open if one of its items is active OR if on parent path
    if (isParent && (activeSub || pathname === item.href)) {
      setIsOpen(true);
    }
  }, [isParent, activeSub, pathname, item.href]);

  const handleClick = (e) => {
    if (isParent) {
      e.preventDefault();
      setIsOpen((x) => !x);
    }
  };

  const pillActive = isActive && !isCollapsed;

  const linkStyles = {
    color: pillActive ? ACTIVE_TEXT_COLOR : "#ccc",
    backgroundColor: pillActive ? DASHBOARD_ACTIVE_BG : "transparent",
    boxShadow: pillActive ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
    transition: "all 0.2s ease",
  };

  return (
    <div className="mx-2">
      <Link
        href={item.href}
        onClick={handleClick}
        className={`flex items-center w-full my-1 ${
          isCollapsed
            ? "justify-center p-3.5 rounded-xl"
            : "space-x-3 py-2.5 px-4 rounded-xl"
        } ${!pillActive ? "hover:bg-white/10" : ""}`}
        style={linkStyles}
      >
        <Icon
          size={19}
          style={{ color: linkStyles.color || "#ccc" }}
          strokeWidth={2}
        />

        {!isCollapsed && (
          <>
            <span className="flex-1 text-sm font-medium">{item.name}</span>

            {isParent &&
              (isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
          </>
        )}
      </Link>

      {isParent && isOpen && !isCollapsed && (
        <div className="pt-1  mx-1 text-sm flex-row items-end justify-center rounded-md">
          {item.submenu.map((sub) => {
            // FIXED: Better matching logic for submenu items
            const [subPath, subQuery] = sub.href.split("?");
            const subParams = new URLSearchParams(subQuery);
            const subType = subParams.get("type");
            const currentType = searchParams.get("type");

            const active = pathname === subPath && subType === currentType;

            const submenuActiveStyles = {
              color: active ? ACTIVE_TEXT_COLOR : "#d1d5db",
              backgroundColor: active ? DASHBOARD_ACTIVE_BG : "transparent",
              boxShadow: active ? "0 6px 10px rgba(0, 0, 0, 0.1)" : "none",
              transition: "all 0.2s ease",
            };

            return (
              <Link
                key={sub.href}
                href={sub.href}
                className={`
                  block px-9 py-2.5 my-1 rounded-xl
                  ${active ? "bg-white/15" : "hover:bg-white/10"}
                `}
                style={submenuActiveStyles}
              >
                <div className="flex items-center gap-2.5 w-full pl-2">
                  <sub.icon
                    size={15}
                    style={{ color: submenuActiveStyles.color }}
                  />
                  <span
                    className="text-sm font-medium flex-1"
                    style={{ color: submenuActiveStyles.color }}
                  >
                    {sub.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function LeftDashboard({ isCollapsed, setIsCollapsed }) {
  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  const [visibleNavItems, setVisibleNavItems] = useState([]);
  useEffect(() => {
    // 1. Get user data
    const adminUser = JSON.parse(localStorage.getItem("admin_user") || "{}");
    const isSuperAdmin =
      adminUser.role === "super_admin" || adminUser.role_id === 1;

    // 2. Filter and Map the navigation items
    const filtered = navItems
      .filter((item) => {
        // Only show protected items if user is Super Admin
        if (item.superAdminOnly) {
          return isSuperAdmin;
        }
        return true;
      })
      .map((item) => {
        // 3. Dynamic Href: If Super Admin, point to the Admin version of Support Tickets
        if (item.name === "Support Tickets" && isSuperAdmin) {
          return { ...item, href: "/supportTicketsAdmin" };
        }
        if (item.name === "Role Management" && isSuperAdmin) {
          return { ...item, href: "/roleManagementAdmin" };
        }
        return item;
      });

    setVisibleNavItems(filtered);
  }, []);
  // Auto-collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isCollapsed, setIsCollapsed]);

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(137, 55, 206, 0.4);
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(137, 55, 206, 0.6);
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(137, 55, 206, 0.4) rgba(255, 255, 255, 0.05);
        }

        /* Hide scrollbar when not hovering (optional) */
        .custom-scrollbar:not(:hover)::-webkit-scrollbar-thumb {
          background: transparent;
        }
      `}</style>

      <div
        className="h-screen fixed top-0 left-0 flex flex-col pt-6 z-20 shadow-xl"
        style={{
          backgroundColor: PRIMARY_BG,
          width: sidebarWidth,
          transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header with Logo and Collapse Button */}
        <div className="relative px-4 pt-2 pb-6">
          {/* Logo Container */}
          <div
            className={`flex ${
              isCollapsed ? "justify-center" : "justify-between"
            } items-center`}
          >
            <img
              src="/logo.jpg"
              alt="Hookik Logo"
              className={`${
                isCollapsed ? "h-8" : "h-10 ml-2"
              } object-contain transition-all duration-250`}
            />

            {/* Collapse Button - Right side when expanded, Above when collapsed */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="
                  p-2 rounded-lg transition-all duration-200 
                  hover:bg-white/20 active:scale-95
                  bg-[#8937ce]/30
                "
                style={{
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
                title="Collapse Sidebar"
              >
                <ChevronLeft size={16} className="text-white" />
              </button>
            )}
          </div>

          {/* Collapse Button - Above logo when collapsed */}
          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="
                absolute -top-4 left-1/2 -translate-x-1/2
                p-2 rounded-lg transition-all duration-200 
                hover:bg-white/20 active:scale-95
                bg-[#8937ce]/30
              "
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
              title="Expand Sidebar"
            >
              <ChevronRight size={16} className="text-white" />
            </button>
          )}
        </div>

        {/* Navigation with Custom Scrollbar */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar pb-4">
          {visibleNavItems.map((item, index) => (
            <NavItem key={index} item={item} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
    </>
  );
}
