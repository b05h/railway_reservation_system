import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../store/useAuthStore.js";
import Branding from "./branding.jsx";

const navItems = [
  { name: "Home", to: "/", private: false },
  { name: "Search Trains", to: "/search", private: false },
  { name: "My Bookings", to: "/bookings", private: true },
  { name: "Contact Us", to: "/contact", private: false },
];

const Navigation = () => {
  const { token, clearAuth } = useAuthStore();

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
                {/* {user.name} */}
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
