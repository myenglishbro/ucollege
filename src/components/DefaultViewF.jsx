import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import medievalBg from '../asset/medieval-bg.png';
import youtubeBg from '../asset/youtube-bg.png';
import tiktokBg from '../asset/tiktok-bg.png';
import kickBg from '../asset/kick-bg.png';
import wspBg from '../asset/wsp-bg.png';
import teleBg from '../asset/tele-bg.png';
import contactBg from '../asset/contact-bg.png';

// Modal reutilizable
const Modal = ({ isOpen, onClose, children }) => {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose} // clic fuera cierra
        >
          <motion.div
            key="modal"
            className="relative rounded-2xl overflow-hidden w-full sm:w-4/5 md:w-3/5 lg:w-1/4 h-full shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            style={{
              backgroundImage: `url(${medievalBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()} // evita propagación dentro
          >
         

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DefaultViewF = ({ realname, userImage, nivel, expirationDate }) => {
  const [isOpen, setIsOpen] = useState(true);

  const platforms = [
    { name: '', href: 'https://www.youtube.com/@_myenglishbro', bg: youtubeBg, bgSize: 'contain' },
    { name: '', href: 'https://www.tiktok.com/@myenglishbro', bg: tiktokBg, bgSize: 'contain' },
    { name: '', href: 'https://kick.com/MyEnglishBro', bg: kickBg, bgSize: 'contain' },
    { name: '', href: 'https://www.whatsapp.com/channel/0029Vb0hd9TADTO5mGsjsO2Y', bg: wspBg, bgSize: 'contain' },
    { name: '', href: 'https://t.me/+KedLi1PcdmNhZjNh', bg: teleBg, bgSize: 'contain' },
    { name: '', href: 'https://api.whatsapp.com/send?phone=51926922032&text=Me%20gustaria%20Informacion%20de%20cursos%0A', bg: contactBg, bgSize: 'contain' },

  ];

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="relative z-10 flex flex-col items-center text-center p-6 ">
        {/* Avatar */}
        <div className="relative p-1 ">
          <motion.img
            src={userImage}
            alt={realname}
            className="w-28 h-28 "
            
          />
        </div>

        {/* Nombre con efecto “trueno” */}
        <motion.h2
          initial={{ textShadow: "0 0 0px rgba(173,216,230,0)" }}
          animate={{
            textShadow: [
              "0 0 0px rgba(173,216,230,0)",
              "0 0 10px rgba(173,216,230,1)",
              "0 0 20px rgba(173,216,230,0.5)",
              "0 0 0px rgba(173,216,230,0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-3 text-4xl font-extrabold text-gray-200"
        >
          {realname}
        </motion.h2>


        {/* Botones de plataformas */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-0 w-full">
        {platforms.map(({ name, href, bg, bgSize }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center h-20 font-bold text-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-[rgba(180,90,0,0.9)] transition-transform duration-200 ease-in-out hover:scale-110"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: bgSize,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <span className="z-10 drop-shadow-lg">{name}</span>
            </a>
          ))}
        </div>

        {/* Botón Cerrar tipo X */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          className="stroke-[rgba(200,100,0,0.9)] hover:stroke-yellow-600 transition-colors"
          aria-label="Cerrar modal"
        >
        <p>Click to start</p>
        </button>
      </div>
    </Modal>
  );
};

export default DefaultViewF;
