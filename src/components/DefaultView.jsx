import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaVideo } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";

const Modal = ({ isOpen, onClose, children, className }) => {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          className={`relative border border-[#23243b] bg-[#181a20] rounded-2xl shadow-2xl ${className}`}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-100 text-xl transition"
            onClick={onClose}
            aria-label="Cerrar Modal"
          >✕</button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DefaultView = ({ realname, userImage, nivel, expirationDate }) => {
  const [isMainModalOpen, setIsMainModalOpen] = React.useState(true);

  return (
    <Modal
      isOpen={isMainModalOpen}
      onClose={() => setIsMainModalOpen(false)}
      className="w-full max-w-md p-7"
    >
      <div className="flex flex-col items-center text-center text-gray-100">
        {/* Avatar */}
        <motion.img
          src={userImage}
          alt={realname}
          className="w-24 h-24 rounded-full border-4 border-[#313649] shadow-xl mb-5"
          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Nombre grande */}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 text-[#f1f3fa]">{realname}</h2>
        {/* Nivel */}
        <span className="inline-block bg-[#23243b] text-[#7bb3fa] px-4 py-1 rounded-lg text-sm font-semibold tracking-wide mb-2 shadow">
          {nivel}
        </span>

        {/* Expiración destacada */}
        <div className="flex items-center justify-center gap-2 bg-[#23243b]/80 px-4 py-2 rounded-xl text-sm font-medium text-gray-300 border border-[#2c3242] mb-5 shadow">
          <MdCalendarMonth className="text-[#7bb3fa] text-lg" />
          <span>
            Acceso activo hasta: <span className="font-bold text-[#f1f3fa]">{expirationDate}</span>
          </span>
        </div>

        {/* Botones acción */}
        <div className="mt-2 flex flex-col gap-3 w-full">
          <a
            href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#23243b] hover:bg-[#24272f] text-gray-100 font-semibold border border-[#283042] shadow-md transition"
          >
            <FaWhatsapp className="text-green-400" /> WhatsApp
          </a>
          <a
            href="https://meet.google.com/dkc-noko-zey"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#23243b] hover:bg-[#24272f] text-gray-100 font-semibold border border-[#283042] shadow-md transition"
          >
            <FaVideo className="text-[#7bb3fa]" /> Ir a mi Clase
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default DefaultView;
