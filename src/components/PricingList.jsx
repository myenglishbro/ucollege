import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Globe, Shield } from "lucide-react";
import { pricing } from "../constants";
import Button from "./Button";

const ICONS = [Zap, Globe, Shield];
const COLORS = [
  { base: "purple", bg: "rgba(168, 85, 247, 0.2)" },
  { base: "blue", bg: "rgba(59, 130, 246, 0.2)" },
  { base: "green", bg: "rgba(34, 197, 94, 0.2)" },
];

const PricingCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { base, bg } = COLORS[index];
  const IconComponent = ICONS[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-2xl border border-${base}-500/30 shadow-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl`}
    >
      {/* Animated Gradient Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          background: `radial-gradient(600px circle at center, ${bg}, transparent 70%)`,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Featured Badge */}
      <AnimatePresence>
        {item.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold z-10"
          >
            Most Popular
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative z-10 p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <IconComponent className={`w-10 h-10 text-${base}-500`} />
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/70 min-h-[3rem]">{item.description}</p>

        {/* Pricing */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-4xl font-extrabold text-white">{item.price}</span>
            {item.price3 && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded bg-${base}-100 text-${base}-800`}>
                {item.price3}
              </span>
            )}
          </div>
          {item.price2 && <span className="text-sm text-white/50">{item.price2}</span>}
        </div>

        {/* Call to Action */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className={`w-full flex items-center justify-center space-x-2 group bg-${base}-600 hover:bg-${base}-700 text-white`}
            href={item.price ? "https://wa.link/6zozfx" : "mailto:contact@jsmastery.pro"}
          >
            <span>{item.price ? "Get Started" : "Contact Us"}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Features */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white/60">What's Included</h4>
          <ul className="space-y-3">
            {item.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0.7, x: 0, transition: { delay: featureIndex * 0.1 } }}
                className="flex items-center space-x-3"
              >
                <Check className={`w-5 h-5 text-${base}-500`} strokeWidth={2.5} />
                <span className="text-sm text-white/80">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const PricingList = () => {
  return (
    <div className="bg-gradient-to-br min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((item, index) => (
            <PricingCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingList;
