'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTheme } from '../context/ThemeContext';
import { playSound } from '../utils/sounds';
import FirstTimeLogin from '../components/FirstTimeLogin';

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

const messages = [
  "Happy Birthday! 🎉",
  "Wishing you a fantastic day! 🎂",
  "May all your dreams come true! ✨",
  "Another year of amazing adventures! 🚀",
  "Celebrate in style! 🎊",
];

const emojis = ['🎈', '🎁', '🎀', '🎊', '🎉', '✨', '🌟', '💫'];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createFloatingEmoji = () => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const x = Math.random() * windowSize.width;
    const y = Math.random() * windowSize.height;
    const id = Date.now();
    setFloatingEmojis(prev => [...prev, { id, emoji, x, y }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== id));
    }, 3000);
  };

  const handleConfetti = () => {
    try {
      setShowConfetti(true);
      playSound('confetti');
      createFloatingEmoji();
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      console.error('Error handling confetti:', error);
    }
  };

  const changeMessage = () => {
    try {
      const currentIndex = messages.indexOf(currentMessage);
      const nextIndex = (currentIndex + 1) % messages.length;
      setCurrentMessage(messages[nextIndex]);
      playSound('click');
      createFloatingEmoji();
    } catch (error) {
      console.error('Error changing message:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <FirstTimeLogin />
      
      <div className="confetti-container">
        <AnimatePresence>
          {showConfetti && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={isMobile ? 200 : 500}
            />
          )}
        </AnimatePresence>
        {floatingEmojis.map(({ id, emoji, x, y }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0, x, y }}
            animate={{ opacity: 1, scale: 1, y: y - 100 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1 }}
            className="absolute text-4xl animate-sparkle"
            style={{ left: x, top: y }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto px-4 mt-16 relative z-10"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 animate-float"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {currentMessage}
        </motion.h1>

        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfetti}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-purple-500 group-hover:from-blue-500 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center gap-2">
              🎉 Throw Confetti
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={changeMessage}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center gap-2">
              🔄 Change Message
            </span>
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
} 