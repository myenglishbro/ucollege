import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children, className }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
          onClick={onClose}
        ></div>
        <motion.div
          className={`relative border border-[#444] bg-[#141414] rounded-2xl shadow-2xl ${className}`}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Cerrar Modal"
          >
            ✕
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const DefaultViewdos = ({ realname, userImage, nivel, expirationDate }) => {
  const [isMainModalOpen, setIsMainModalOpen] = useState(true);

  const handleCloseMain = () => {
    setIsMainModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isMainModalOpen}
        onClose={handleCloseMain}
        className="w-11/12 sm:w-3/5 lg:w-1/3 p-6 md:p-8"
      >
        <div className="flex flex-col items-center text-center text-white">
          <motion.img
            src={userImage}
            alt={realname}
            className="w-24 h-24 rounded-full border-4 border-gray-600 shadow-lg mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <h2 className="text-2xl font-bold tracking-wide text-gray-200">{realname}</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">{nivel}</p>
          <p className="text-xs text-gray-500 mt-1">Expira el: {expirationDate}</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
            <a
              href="https://join.slack.com/share/enQtOTAxNjYyNjE5MzM0OC04MjAyN2FlNTE3M2M4NzIxNjZhNzFlNTk0MmJmOWRkMmY3MzYwZjE1NjRhYjk3ZjNhZDFiY2E1Nzc0ZWM4NDA4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg bg-[#1f1f1f] text-gray-200 font-semibold border border-gray-600 shadow-md hover:bg-[#2a2a2a] transition text-sm text-center"
            >
              Slack
            </a>
             <a
              href="https://meet.google.com/dkc-noko-zey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg bg-[#1f1f1f] text-gray-200 font-semibold border border-gray-600 shadow-md hover:bg-[#2a2a2a] transition text-sm text-center"
            >
              Join Class
            </a>
           
          </div>
        </div>
      </Modal>

      
    </>
  );
};

export default DefaultViewdos;
