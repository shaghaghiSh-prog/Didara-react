"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SmallLoader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimatePresence>
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full bg-[#d1b560] opacity-20"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#d18d60] border-t-transparent"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Counter-rotating inner ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-[#d1b560] border-b-transparent"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="https://didaraoptic.com/static/media/logo.19cbf7dc.webp"
            alt="Didara Optic Logo"
            width={30}
            height={30}
            className="rounded-full bg-white p-1 "
          />
        </motion.div>
      </div>

      {/* Background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#d1b560] rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default SmallLoader;
