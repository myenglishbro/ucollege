import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { menu, close } from "../assets/index";
import { navLinks } from "../constants/index";

// Animations & effects
const navbarVariants = {
  hidden: { opacity: 0, y: -36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const glowShadow =
  "shadow-[0_4px_20px_0_#90b4fa40,0_1.5px_8px_0_#6387db33,0_1px_0_#2646a140]";
const glassRing = "ring-1 ring-[#a5b4fc99] ring-inset";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-50 bg-[#121420dd] backdrop-blur-xl border-b border-[#242742]/60 shadow-[0_2px_16px_#181c2a44]"
      style={{ WebkitBackdropFilter: "blur(14px)" }}
    >
      <nav className="flex items-center h-[68px] px-4 md:px-10 relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center select-none group transition-all"
        >
          <motion.span
            whileHover={{ scale: 1.07, color: "#a5b4fc", letterSpacing: 1.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="ml-2 text-2xl font-black tracking-tight text-white transition-all"
          >
            MyenglishBro!
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden sm:flex flex-1 justify-end items-center gap-2">
          {navLinks.map((nav, idx) =>
            !nav.subLinks ? (
              <motion.li
                key={nav.title}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 6px 24px 0 #a5b4fc30",
                  filter: "brightness(1.12)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className={`
                  mx-2 px-4 py-1.5 rounded-2xl font-semibold text-base relative
                  cursor-pointer transition-all duration-150
                  ${
                    active === nav.title
                      ? `bg-[#21243a] text-white ${glowShadow} after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:rounded-full after:bg-[#a5b4fc] after:animate-pulse`
                      : "text-gray-300 hover:bg-[#222545]/70 hover:text-[#e0e7ff]"
                  }
                  group overflow-hidden
                `}
                onClick={() => setActive(nav.title)}
              >
                <Link to={nav.path} className="flex items-center gap-2">
                  {/* Ícono minimal */}
                  <span className="text-[#a5b4fc] group-hover:text-white transition-colors duration-200">
                    {nav.icon}
                  </span>
                  <span>{nav.title}</span>
                  {/* efecto glass ring al hover */}
                  <motion.span
                    className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-200 ${
                      active === nav.title ? glassRing : ""
                    }`}
                    initial={false}
                    animate={
                      active === nav.title
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                  />
                </Link>
              </motion.li>
            ) : (
              <motion.li
                key={nav.title}
                className="relative mx-2"
                whileHover={{
                  scale: 1.07,
                  boxShadow: "0 6px 28px 0 #a5b4fc30",
                  filter: "brightness(1.15)",
                }}
                whileTap={{ scale: 0.94 }}
              >
                <button
                  onClick={() => handleDropdownToggle(idx)}
                  className={`
                    px-4 py-1.5 rounded-2xl font-semibold text-base relative
                    transition-all group flex items-center gap-2
                    ${
                      dropdownOpen === idx
                        ? `bg-[#22274a] text-[#a5b4fc] ${glowShadow} ${glassRing}`
                        : "text-gray-300 hover:bg-[#23263a]/80 hover:text-[#a5b4fc]"
                    }
                  `}
                >
                  {/* Ícono minimal */}
                  <span className="text-[#a5b4fc] group-hover:text-white transition-colors duration-200">
                    {nav.icon}
                  </span>
                  {nav.title}
                  <motion.span
                    className="ml-2"
                    animate={{ rotate: dropdownOpen === idx ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropdownOpen === idx && (
                    <motion.ul
                      initial={{
                        opacity: 0,
                        y: 18,
                        scale: 0.96,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        boxShadow: "0 12px 44px 0 #20254f60",
                      }}
                      exit={{
                        opacity: 0,
                        y: 12,
                        scale: 0.97,
                        filter: "blur(5px)",
                      }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-4 w-52 bg-[#181c2a]/95 backdrop-blur-2xl rounded-2xl shadow-2xl py-2 px-2 ring-1 ring-[#23263a]/70 z-50"
                    >
                      {nav.subLinks.map((subNav) => (
                        <motion.li
                          key={subNav.title}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#222b4f",
                            color: "#a5b4fc",
                          }}
                          whileTap={{ scale: 0.96 }}
                          className="px-3 py-2 text-gray-200 rounded-lg font-medium text-[15px] cursor-pointer transition-all flex items-center gap-2"
                          onClick={() => {
                            setActive(subNav.title);
                            setDropdownOpen(null);
                          }}
                        >
                          <span className="text-[#a5b4fc]">{subNav.icon}</span>
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

        {/* Mobile */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <motion.button
            aria-label="Toggle menu"
            onClick={() => setToggle((t) => !t)}
            whileTap={{ scale: 0.88 }}
            className="focus:outline-none transition-transform"
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-8 h-8"
            />
          </motion.button>
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.97 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  boxShadow: "0 12px 44px 0 #20254f70",
                }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.19 }}
                className="fixed top-[70px] right-4 w-72 bg-[#181c2a]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-[#23263a]/40 z-50 p-6"
              >
                <ul className="flex flex-col gap-2">
                  {navLinks.map((nav, idx) =>
                    !nav.subLinks ? (
                      <motion.li
                        key={nav.title}
                        whileTap={{ scale: 0.93 }}
                        className={`
                          px-3 py-2 rounded-2xl font-semibold text-base relative
                          cursor-pointer transition-all duration-150
                          ${
                            active === nav.title
                              ? `bg-[#23263a] text-white ${glowShadow}`
                              : "text-gray-300 hover:bg-[#222545]/70 hover:text-[#a5b4fc]"
                          }
                        `}
                        onClick={() => {
                          setActive(nav.title);
                          setToggle(false);
                        }}
                      >
                        <Link to={nav.path} className="flex items-center gap-2">
                          <span className="text-[#a5b4fc]">{nav.icon}</span>
                          <span>{nav.title}</span>
                        </Link>
                      </motion.li>
                    ) : (
                      <motion.li key={nav.title} className="relative">
                        <button
                          onClick={() => handleDropdownToggle(idx)}
                          className={`
                            w-full text-left px-3 py-2 rounded-2xl font-semibold text-base transition-all group flex items-center gap-2
                            ${
                              dropdownOpen === idx
                                ? `bg-[#23263a]/80 text-[#a5b4fc] ${glowShadow}`
                                : "text-gray-300 hover:bg-[#202436]/90 hover:text-[#a5b4fc]"
                            }
                          `}
                        >
                          <span className="text-[#a5b4fc]">{nav.icon}</span>
                          {nav.title}
                          <motion.span
                            className="ml-2"
                            animate={{ rotate: dropdownOpen === idx ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            ▼
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {dropdownOpen === idx && (
                            <motion.ul
                              initial={{
                                opacity: 0,
                                y: 10,
                                scale: 0.97,
                                filter: "blur(4px)",
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                filter: "blur(0px)",
                              }}
                              exit={{
                                opacity: 0,
                                y: 8,
                                scale: 0.97,
                                filter: "blur(3px)",
                              }}
                              transition={{ duration: 0.16 }}
                              className="mt-2 bg-[#21243a] rounded-xl shadow-xl ring-1 ring-[#23263a]/60 flex flex-col"
                            >
                              {nav.subLinks.map((subNav) => (
                                <motion.li
                                  key={subNav.title}
                                  whileHover={{
                                    scale: 1.03,
                                    backgroundColor: "#2a325c",
                                    color: "#a5b4fc",
                                  }}
                                  whileTap={{ scale: 0.96 }}
                                  className="px-3 py-2 text-gray-200 rounded-lg font-medium text-[15px] cursor-pointer hover:bg-[#343867]/80 hover:text-[#a5b4fc] transition-all flex items-center gap-2"
                                  onClick={() => {
                                    setActive(subNav.title);
                                    setDropdownOpen(null);
                                    setToggle(false);
                                  }}
                                >
                                  <span className="text-[#a5b4fc]">{subNav.icon}</span>
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
