import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Generic Modal component
 * @param {boolean} isOpen - whether to show the modal
 * @param {string} title - modal header title
 * @param {React.ReactNode} children - content inside the modal
 * @param {() => void} onClose - callback when closing the modal
 */
export default function Modal({ isOpen, title, children, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#11131A] text-[#E5E7EB] rounded-2xl shadow-xl w-11/12 max-w-lg p-6 relative border border-[#2E3352]"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#A0A3C2] hover:text-[#FFA8F4] text-xl font-bold transition"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {title && (
              <h2 className="text-2xl font-semibold mb-4 text-[#FFA8F4]">
                {title}
              </h2>
            )}

            <div className="modal-content">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
