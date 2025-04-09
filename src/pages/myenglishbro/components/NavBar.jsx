import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { menu, close } from "../assets/index";
import { navLinks } from "../constants/index";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-gray-700 bg-gray-900 lg:bg-gray-900/90 lg:backdrop-blur-sm mb-5">
      <nav className="flex items-center h-[70px] px-5 lg:px-10 max-lg:py-4">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Si deseas incluir un logo, descomenta y actualiza la imagen */}
          {/* <img src={logo} alt="Logo" className="h-[50px] w-[50px] md:h-[50px] md:w-[50px]" /> */}
          <h3 className="ml-6 font-bold text-xl text-white">MyenglishBro!</h3>
        </div>

        {/* Desktop Navigation */}
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) =>
            !nav.subLinks ? (
              <motion.li
                key={nav.title}
                className={`font-medium cursor-pointer text-[16px] transition-all duration-300 ${
                  active === nav.title ? "text-white" : "text-gray-400"
                } mr-10`}
                onClick={() => setActive(nav.title)}
                whileHover={{ scale: 1.1 }}
              >
                <Link to={nav.path}>{nav.title}</Link>
              </motion.li>
            ) : (
              <motion.li key={nav.title} className="relative mr-12">
                <button
                  onClick={() => handleDropdownToggle(index)}
                  className={`font-medium cursor-pointer text-[16px] transition-all ${
                    dropdownOpen === index ? "text-white" : "text-gray-400"
                  }`}
                >
                  {nav.title}
                </button>
                <AnimatePresence>
                  {dropdownOpen === index && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute mt-4 bg-gray-800 rounded-lg shadow-xl py-3 px-4 w-[200px] z-50"
                    >
                      {nav.subLinks.map((subNav) => (
                        <motion.li
                          key={subNav.title}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#1E293B",
                          }}
                          className="font-medium text-[14px] text-gray-300 py-2 px-3 rounded-md cursor-pointer transition-all"
                          onClick={() => {
                            setActive(subNav.title);
                            setDropdownOpen(null);
                          }}
                        >
                          <Link to={subNav.path}>{subNav.title}</Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          )}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <button
            aria-label="Toggle menu"
            onClick={() => setToggle(!toggle)}
            className="focus:outline-none"
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
            />
          </button>
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 bg-gray-800 absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-lg shadow-lg z-50"
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                  {navLinks.map((nav, index) =>
                    !nav.subLinks ? (
                      <li
                        key={nav.title}
                        className={`font-medium cursor-pointer text-[16px] ${
                          active === nav.title ? "text-white" : "text-gray-400"
                        } mb-6`}
                        onClick={() => {
                          setActive(nav.title);
                          setToggle(false);
                        }}
                      >
                        <Link to={nav.path}>{nav.title}</Link>
                      </li>
                    ) : (
                      <li key={nav.title} className="relative mb-6">
                        <button
                          onClick={() => handleDropdownToggle(index)}
                          className="font-medium cursor-pointer text-[16px] text-gray-400"
                        >
                          {nav.title}
                        </button>
                        <AnimatePresence>
                          {dropdownOpen === index && (
                            <motion.ul
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="bg-gray-700 rounded-lg shadow-lg py-2 px-4 w-full"
                            >
                              {nav.subLinks.map((subNav) => (
                                <li
                                  key={subNav.title}
                                  className="font-medium text-[14px] text-gray-300 py-2 px-3 rounded-md hover:bg-gray-600 cursor-pointer"
                                  onClick={() => {
                                    setActive(subNav.title);
                                    setDropdownOpen(null);
                                    setToggle(false);
                                  }}
                                >
                                  <Link to={subNav.path}>{subNav.title}</Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
