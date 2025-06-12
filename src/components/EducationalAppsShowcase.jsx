import React from 'react';
import { FaStar, FaRegHeart, FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';

const englishApps = [
  {
    title: 'Sixty Type',
    description: 'Escribe la respuesta antes de 60 segundos solo tienes 3 intentos',
    image: 'https://i.ibb.co/1Y4kJvCv/Chat-GPT-Image-Jun-12-2025-12-52-40-PM.png',
    tag: 'NEW',
    url: '/sixtytype',
    rating: 4.5,
  },
  {
    title: 'Listening Lab',
    description: 'Train your ears with real-world audio.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    tag: 'TRENDING',
    rating: 4,
    url: '/listening-lab',
  },
  {
    title: 'Speaking Arena',
    description: 'Practice speaking with AI-powered simulations.',
    image: 'https://images.unsplash.com/photo-1559027615-cdcbf00f7ce5',
    tag: 'C2 LEVEL',
    rating: 5,
    url: '/speaking-arena',
  },
  {
    title: 'Vocab Vault',
    description: 'Unlock thousands of academic words.',
    image: 'https://images.unsplash.com/photo-1611920639809-d2f7d48f0f45',
    tag: 'UPDATED',
    rating: 4.8,
    url: '/vocab-vault',
  }
];

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating || 0);
  const hasHalf = rating % 1 !== 0;
  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
      {hasHalf && <FaStar className="opacity-50" />}
    </div>
  );
};

const AppCard = ({ app }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="group relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl shadow-xl overflow-hidden transition-all duration-500 border border-[#334155] hover:border-indigo-500"
  >
    <div className="relative overflow-hidden h-72">
      <img
        src={app.image}
        alt={app.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">{app.tag}</span>
      <motion.button
        whileHover={{ scale: 1.2 }}
        className="absolute top-3 right-3 bg-white/10 text-white p-2 rounded-full shadow backdrop-blur-md hover:bg-red-500 transition"
      >
        <FaRegHeart />
      </motion.button>
    </div>
    <div className="p-5">
      <h3 className="text-lg font-semibold text-white mb-1 tracking-wide">{app.title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-snug">{app.description}</p>
      <div className="flex items-center justify-between">
        <RatingStars rating={app.rating} />
        <a
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition flex items-center gap-1"
        >
          <FaRocket /> Try
        </a>
      </div>
    </div>
  </motion.div>
);

const EducationalAppsShowcase = () => {
  return (
    <section className="bg-[#0a0f1c] py-16 px-6 min-h-screen font-sans">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-white mb-12 tracking-wider"
      >
        🚀 Explore English Learning Apps
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {englishApps.map((app, idx) => <AppCard app={app} key={idx} />)}
      </div>
    </section>
  );
};

export default EducationalAppsShowcase;
