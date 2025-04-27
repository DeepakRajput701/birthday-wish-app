'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../utils/sounds';

export default function FirstTimeLogin() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const checkFirstTime = () => {
      try {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
          setIsFirstTime(true);
          setShowCelebration(true);
          localStorage.setItem('hasVisited', 'true');
          playSound('success');
        }
      } catch (error) {
        console.error('Error checking first visit:', error);
      }
    };

    checkFirstTime();
  }, []);

  if (!isFirstTime) return null;

  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center border-2 border-purple-200 dark:border-purple-800"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              🎂 Welcome! 🎂
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Thank you for using our Birthday Wish App! We hope you enjoy celebrating special moments with us.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCelebration(false)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full hover:brightness-110 hover:translate-y-[-2px] active:translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Let's Celebrate!
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 