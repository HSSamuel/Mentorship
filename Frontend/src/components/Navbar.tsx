import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const baseLinkClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const inactiveLinkClasses =
    "text-gray-500 hover:bg-gray-100 hover:text-gray-900";
  const activeLinkClasses = "bg-gray-900 text-white";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`;

  const renderNavLinks = () => (
    <>
      <NavLink to="/dashboard" className={getNavLinkClass}>
        Dashboard
      </NavLink>
      {user?.role === "MENTEE" && (
        <>
          <NavLink to="/mentors" className={getNavLinkClass}>
            Find a Mentor
          </NavLink>
          <NavLink to="/my-mentors" className={getNavLinkClass}>
            My Mentors
          </NavLink>
          <NavLink to="/my-requests" className={getNavLinkClass}>
            My Requests
          </NavLink>
        </>
      )}
      {user?.role === "MENTOR" && (
        <>
          <NavLink to="/requests" className={getNavLinkClass}>
            Requests
          </NavLink>
          <NavLink to="/availability" className={getNavLinkClass}>
            Availability
          </NavLink>
        </>
      )}
      {user?.role === "ADMIN" && (
        <>
          <NavLink to="/admin/users" className={getNavLinkClass}>
            Users
          </NavLink>
          <NavLink to="/admin/matches" className={getNavLinkClass}>
            Matches
          </NavLink>
          <NavLink to="/admin/sessions" className={getNavLinkClass}>
            Sessions
          </NavLink>
        </>
      )}
      <NavLink to="/my-sessions" className={getNavLinkClass}>
        My Sessions
      </NavLink>
      <NavLink to="/messages" className={getNavLinkClass}>
        Messages
      </NavLink>
    </>
  );

  const renderLoggedOutLinks = () => {
    if (location.pathname === "/login") {
      return (
        <NavLink to="/register" className={getNavLinkClass}>
          Register
        </NavLink>
      );
    }
    if (location.pathname === "/register") {
      return (
        <NavLink to="/login" className={getNavLinkClass}>
          Login
        </NavLink>
      );
    }
    return (
      <NavLink to="/login" className={getNavLinkClass}>
        Login
      </NavLink>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/dashboard"
              className="text-2xl font-bold text-gray-900"
            >
              MentorMe
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {user && renderNavLinks()}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className="ml-4 flex items-center md:ml-6">
                <NotificationBell />
                <span className="text-gray-600 text-sm mx-4">
                  Welcome, {user.profile?.name || user.email.split("@")[0]}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              renderLoggedOutLinks()
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            {user && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user && renderNavLinks()}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <NotificationBell />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-800">
                    {user.profile?.name || user.email.split("@")[0]}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-white hover:bg-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
