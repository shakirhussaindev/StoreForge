"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "About", href: "/about" },
  ];

  // 
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-default-100"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link
              href="/"
              className="font-bold text-xl tracking-tight text-blue-600"
            >
              StoreForge
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Auth / Profile Area */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-9 h-9 rounded-full bg-default-200 animate-pulse" />
            ) : user ? (
              /* Logged In User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white font-semibold text-sm ring-2 ring-blue-600/20 overflow-hidden focus:outline-none cursor-pointer"
                >
                  {
                    user.displayName?.charAt(0).toUpperCase() ||
                    user.email?.charAt(0).toUpperCase()
                  }
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-default-200 bg-background shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-default-100">
                      <p className="text-xs text-foreground/50">Signed in as</p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/items/add"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-default-100 transition-colors"
                    >
                      Add Product
                    </Link>

                    <Link
                      href="/items/manage"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-foreground/80 hover:bg-default-100 transition-colors"
                    >
                      Manage Products
                    </Link>

                    <div className="border-t border-default-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Buttons */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-border/40 bg-background px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-foreground/70 hover:bg-default-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <>
              <div className="border-t border-default-100 my-2 pt-2" />
              <Link
                href="/items/add"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base text-foreground/70 hover:bg-default-100"
              >
                Add Product
              </Link>
              <Link
                href="/items/manage"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base text-foreground/70 hover:bg-default-100"
              >
                Manage Products
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
