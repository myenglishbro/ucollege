"use client";
import { motion } from "framer-motion";

export default function IncludesList({ includes, title = "What you'll find", src }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#7A5AFF] text-white p-12 lg:p-20  overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left: Mascot/Image with white border & floating labels */}
        <div className="relative flex justify-center">
          {src && (
            <motion.img
              src={src}
              alt={title}
              initial={{ scale: 0.9, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="w-64 md:w-80 lg:w-96 rounded-2xl border-8 border-white shadow-2xl"
            />
          )}
          {/* Floating Pills */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-16 left-1/4 bg-white text-[#7A5AFF] px-3 py-1 rounded-full text-xs font-semibold shadow-md"
          >
            Role Play
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-24 left-1/3 bg-white text-[#7A5AFF] px-3 py-1 rounded-full text-xs font-semibold shadow-md"
          >
            Incluye
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="absolute top-1/4 right-12 bg-white rounded-full p-2 shadow-md text-xl"
          >
            🚀
          </motion.div>
        </div>

        {/* Right: Title & List of features */}
        <div className="space-y-6">
          <span className="inline-block bg-white text-[#7A5AFF] uppercase text-xs px-4 py-1.5 rounded-full font-medium">
            Roadmap
          </span>
          <h2 className="text-5xl font-extrabold leading-tight">
            {title}
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Todo esto encontrarás en tu plataforma
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {includes.map(([text], idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 bg-white bg-opacity-20 border border-white/30 rounded-full px-6 py-3 text-sm font-medium"
              >
                <span className="w-2 h-2 bg-white rounded-full"></span>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
