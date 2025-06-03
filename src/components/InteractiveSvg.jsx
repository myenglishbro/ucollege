"use client";
import React from "react";
import { motion } from "framer-motion";

export default function InteractiveSvg() {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, 2, -2, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      className="w-full flex justify-center"
    >
      <svg width="200" height="130" viewBox="0 0 410 268" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M125.963 25.7266H11.3115C3.59313 25.7266 -1.85482 33.1538 0.591381 40.3413L75.186 259.518C76.7269 264.045 81.0441 267.098 85.9061 267.098H202.99C210.755 267.098 216.207 259.588 213.675 252.381L202.568 220.776C202.248 212.22 210.702 210.223 215.315 210.223H329.375C333.418 210.223 337.153 208.103 339.17 204.663L408.305 86.751C412.643 79.3527 407.204 70.1168 398.509 70.1168H286.086C282.099 70.1168 278.407 72.1789 276.37 75.5436L208.023 188.43C199.72 198.705 192.62 190.353 189.017 182.217L136.648 33.2043C135.075 28.7294 130.784 25.7266 125.963 25.7266Z" fill="#0F192E"></path>
        <path d="M245.195 45.7234C260.931 32.1264 263.632 14.1115 263.996 5.98244C264.045 4.74275 263.672 3.52627 262.945 2.56036C262.218 1.59446 261.188 0.945244 260.047 0.734072C252.555 -0.607804 235.566 -1.60938 219.816 11.999L178.436 47.7536L203.814 81.478L245.195 45.7234Z" fill="url(#paint0_linear)"></path>
        <path d="M215.154 16.0276L178.645 11.8339C177.39 11.6904 176.133 12.0862 175.15 12.9345L152.627 32.3953C151.939 32.9909 151.42 33.7799 151.127 34.6739C150.834 35.568 150.779 36.5318 150.968 37.4575C151.157 38.3832 151.582 39.2343 152.197 39.9155C152.812 40.5967 153.591 41.0811 154.448 41.3145L178.436 47.7536" fill="url(#paint1_linear)"></path>
        <path d="M240.533 49.7513L236.619 88.8724C236.484 90.2169 235.856 91.4491 234.874 92.2985L212.352 111.759C211.663 112.353 210.833 112.73 209.955 112.848C209.078 112.965 208.187 112.818 207.383 112.424C206.579 112.03 205.893 111.404 205.402 110.616C204.911 109.828 204.634 108.909 204.603 107.962L203.814 81.478" fill="url(#paint2_linear)"></path>
        <path d="M184.572 55.9606L187.79 53.1795L202.078 72.1652L197.272 76.3171C193.466 81.9256 184.175 90.8505 164.35 88.5732C166.74 64.6817 179.229 57.7464 184.502 55.8681L184.572 55.9606Z" fill="url(#paint3_linear)"></path>
        <path d="M165.941 96.7439L153.968 78.5234L40.2266 161.101L65.6923 234.409L165.941 96.7439Z" fill="#050C1A"></path>
        <defs>
          <linearGradient id="paint0_linear" x1="261.252" y1="2.36177" x2="162.557" y2="83.2144" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2F78FF" />
            <stop offset="1" stopColor="#0F192E" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="261.252" y1="2.36177" x2="162.557" y2="83.2144" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2F78FF" />
            <stop offset="1" stopColor="#0F192E" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="261.252" y1="2.36177" x2="162.557" y2="83.2144" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2F78FF" />
            <stop offset="1" stopColor="#0F192E" />
          </linearGradient>
          <linearGradient id="paint3_linear" x1="261.252" y1="2.36177" x2="162.557" y2="83.2144" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2F78FF" />
            <stop offset="1" stopColor="#0F192E" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
