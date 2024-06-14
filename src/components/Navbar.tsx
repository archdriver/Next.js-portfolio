"use client";

import React, { useState, useEffect } from "react";

import Logo from "./Logo";

import Link from "next/link";

import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 初期化時にlocalStorageからダークモードの状態を読み込む
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const navigation = [
    { title: "Home", href: "/" },
    { title: "About me", href: "/about" },
    { title: "Categories", href: "/categories" },
    { title: "Contact", href: "https://forms.gle/jqPDNGGBwg4HQoeC6" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <div
      className={`w-full ${
        isDarkMode ? "bg-gray-900" : "bg-white/70"
      } h-20 shadow-md sticky top-0 backdrop-blur-2xl transition-colors z-50`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-0 h-full">
        <Logo
          title="Next.js Blog Portofolio"
          className={`text-${isDarkMode ? "white" : "black"}`}
        />
        <div className="hidden md:inline-flex items-center gap-7 text-gray-900 hover:text-black duration-200">
          {navigation.map((item) => (
            <Link
              key={item?.title}
              href={item?.href}
              className={`text-sm uppercase font-semibold relative group overflow-hidden ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {item?.title}
              <span
                className={`w-full h-[1px] ${
                  isDarkMode ? "bg-white" : "bg-blue-700"
                } absolute inline-block left-0 bottom-0 -translate-x-[100%] group-hover:translate-x-0 transition-transform duration-200`}
              />
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className="text-xl"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleDarkMode}
            className="text-xl mr-4"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          {isOpen ? (
            <FiX className="text-2xl" onClick={toggleMenu} />
          ) : (
            <FiMenu className="text-2xl" onClick={toggleMenu} />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className={`md:hidden ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } p-4 shadow-md`}
        >
          {navigation.map((item) => (
            <Link
              key={item?.title}
              href={item?.href}
              className={`block ${
                isDarkMode ? "text-white" : "text-gray-900"
              } hover:text-black duration-200 py-2`}
              onClick={toggleMenu}
            >
              {item?.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
