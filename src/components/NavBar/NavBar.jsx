import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { close, menu, logo } from '../../assets/index';
import { navLinks } from '../../constants';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);

  // Estado para manejar el dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-n-8 lg:bg-n-8/90 lg:backdrop-blur-sm">
      <nav className="flex items-center h-[70px] px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo de MyBro"
            className="h-[50px] w-[50px] md:h-[50px] md:w-[50px]"
          />
          <h3 className="ml-3 font-poppins font-semibold ss:text-[32px] text-[32px] text-white ss:leading-[100.8px] leading-[75px]">
            MyEnglishBro!
          </h3>
        </div>

        {/* Desktop links */}
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.slice(0, 5).map((nav, index) => (
            <li
              key={nav.title}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === nav.title ? 'text-white' : 'text-dimWhite'
              } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.path}>{nav.title}</Link>
            </li>
          ))}

          {/* Dropdown menu */}
          <li className="relative">
            <button
              onClick={handleDropdown}
              className="font-poppins font-normal cursor-pointer text-[16px] text-dimWhite"
            >
              Roadmaps
            </button>
            {dropdownOpen && (
              <ul className="absolute mt-2 bg-n-8 rounded-xl shadow-lg p-3">
                {navLinks.slice(5).map((nav, index) => (
                  <li
                    key={nav.title}
                    className={`font-poppins font-normal cursor-pointer text-[16px] text-dimWhite ${
                      index === navLinks.length - 1 ? 'mb-0' : 'mb-2'
                    }`}
                    onClick={() => {
                      setActive(nav.title);
                      setDropdownOpen(false);
                    }}
                  >
                    <Link to={nav.path}>{nav.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile menu */}
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

          <div
            className={`${
              !toggle ? 'hidden' : 'flex'
            } p-6 bg-n-8 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl shadow-lg z-50`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.title}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? 'text-white' : 'text-dimWhite'
                  } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <Link to={nav.path}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
