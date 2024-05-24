import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { close, menu } from '../../assets'; // Asegúrate de tener importado tu logo y los iconos
import { navLinks } from '../../constants';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar z-50 bg-black-gradient">
      <div className="flex items-center">
        <img
          src="https://i.ibb.co/qmFGbzk/Sin-t-tulo-2-removebg-preview.png"
          alt="Logo de MyBro"
          className="h-[100px] w-[102px] md:h-[102px] md:w-[102px]"
        />
        <h3 className="ml-3 font-poppins font-semibold ss:text-[32px] text-[32px] text-white ss:leading-[100.8px] leading-[75px]">
          MyEnglishBro!
        </h3>
      </div>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
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
      </ul>

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
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl shadow-lg z-50`}
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
  );
};

export default Navbar;
