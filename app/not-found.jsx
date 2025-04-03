'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="relative">
        {/* Animated fire particles */}
        <div className="absolute inset-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              animate={{
                y: [-200, -800],
                x: Math.sin(i) * 100,
                opacity: [0.8, 0],
                backgroundColor: ['#ff4d4d', '#ff8533', '#ffcc00'],
              }}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-9xl font-bold text-white mb-8 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative inline-block">
              404
              <motion.div
                className="absolute inset-0 blur-xl"
                animate={{
                  background: [
                    'rgba(255, 77, 77, 0.4)',
                    'rgba(255, 133, 51, 0.4)',
                    'rgba(255, 204, 0, 0.4)',
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </span>
          </motion.div>
          
          <motion.p 
            className="text-2xl text-gray-300 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Looks like this page went up in flames
          </motion.p>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link 
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 
                text-white rounded-full hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 
                transition-all duration-300 inline-block shadow-lg hover:shadow-2xl"
            >
              Go to Home 🐶
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

