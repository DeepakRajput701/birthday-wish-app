'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FirstTimeLogin() {
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const checkFirstTime = () => {
      if (typeof window !== 'undefined') {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
          setIsFirstTime(true);
          setShowWelcome(true);
          localStorage.setItem('hasVisited', 'true');
        }
      }
    };

    checkFirstTime();
  }, []);

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg z-50"
        >
          <p className="text-white text-center">
            Welcome to Birthday Wish! 🎂
            {isFirstTime && " Enjoy your first celebration!"}
          </p>
          <button
            onClick={() => setShowWelcome(false)}
            className="mt-2 text-white/70 hover:text-white transition-colors"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 