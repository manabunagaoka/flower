'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { CENTER_BUTTON_SIZE, ANIMATION_DURATION } from '@/lib/constants';

interface NavigationWheelProps {
  isMenuOpen: boolean;
  onToggle: () => void;
  menuState: 'closed' | 'main' | 'more';
  onBack?: () => void;
}

export default function NavigationWheel({ 
  isMenuOpen, 
  onToggle, 
  menuState,
  onBack 
}: NavigationWheelProps) {
  const showBackButton = menuState === 'more';
  
  return (
    <div className="relative flex items-center justify-center">
      <motion.button
        onClick={onToggle}
        className={clsx(
          'rounded-full flex items-center justify-center',
          'bg-white border-2 border-gray-300 shadow-lg',
          'hover:shadow-xl transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-blue-300',
          'hover:scale-105 active:scale-95'
        )}
        style={{
          width: CENTER_BUTTON_SIZE,
          height: CENTER_BUTTON_SIZE,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={false}
      >
        <AnimatePresence mode="wait">
          {!isMenuOpen ? (
            <motion.div
              key="hi-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: ANIMATION_DURATION }}
              className="text-2xl font-semibold text-gray-700"
            >
              Hi
            </motion.div>
          ) : (
            <motion.div
              key="compass-icon"
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
              transition={{ duration: ANIMATION_DURATION }}
              className="text-gray-600"
            >
              <Compass size={32} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Back button for More submenu */}
      <AnimatePresence>
        {showBackButton && onBack && (
          <motion.button
            initial={{ opacity: 0, scale: 0, x: 0 }}
            animate={{ opacity: 1, scale: 1, x: -140 }}
            exit={{ opacity: 0, scale: 0, x: 0 }}
            transition={{ 
              duration: ANIMATION_DURATION,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            onClick={onBack}
            className={clsx(
              'absolute rounded-full flex items-center justify-center',
              'bg-gray-100 border-2 border-gray-300 shadow-md',
              'hover:shadow-lg transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-300',
              'hover:scale-110 active:scale-95'
            )}
            style={{
              width: 50,
              height: 50,
              left: '50%',
              top: '50%',
              marginLeft: -25,
              marginTop: -25,
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}