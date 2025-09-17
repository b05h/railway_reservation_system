import React from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAuthStore } from "../store/useAuthStore.js";
import Branding from "./branding.jsx";

const userNavItems = [
  { name: "Home", to: "/", private: false },
  { name: "Search Trains", to: "/trains", private: false },
  { name: "My Bookings", to: "/bookings", private: false },
  { name: "Contact Us", to: "/contact", private: false },
  { name: "Profile", to: "/profile", private: false },
];

const adminNavItems = [
  { name: "Search Trains", to: "/admin/trains", private: false },
  { name: "Search Stations", to: "/admin/stations", private: false },
  { name: "Revenue", to: "/admin/revenue", private: false },
  { name: "Logs", to: "/admin/logs", private: false },
];

const Navigation = () => {
  const { token, clearAuth } = useAuthStore();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Switch menu set based on whether path includes "/admin"
  const navItems = currentPath.includes("/admin")
    ? adminNavItems
    : userNavItems;

  return (
    <nav className="px-4 py-2 flex justify-between items-center bg-base-300 shadow-md">
      <Branding />
      <ul className="flex space-x-4 items-center">
        {navItems.map((item) => {
          if (item.private && !token) {
            return null;
          }
          return (
            <li key={item.to}>
              <Link
                className="btn btn-ghost hover:border hover:border-primary"
                to={item.to}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul className="flex space-x-4 items-center">
        <li className="ml-auto">
          {token ? (
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm btn-primary m-1">
                Username
                {/* TODO: replace with real {user.name} */}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={clearAuth}>Sign Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/signin" className="btn btn-sm btn-outline mr-2">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-sm btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
