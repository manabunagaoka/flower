'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

interface TrackWheelProps {
  isMenuOpen: boolean;
  onToggle: () => void;
  onRotate: (angle: number) => void;
  currentAngle: number;
  menuState: 'closed' | 'main' | 'more';
  onActivate: () => void;
  onBack: () => void;
}

export default function TrackWheel({ 
  isMenuOpen, 
  onToggle, 
  onRotate, 
  currentAngle,
  menuState,
  onActivate,
  onBack
}: TrackWheelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  // Handle single vs double click
  const handleCenterClick = () => {
    setClickCount(prev => prev + 1);

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    clickTimer.current = setTimeout(() => {
      if (clickCount === 0) {
        // Single click - forward action
        if (!isMenuOpen) {
          onToggle();
        } else {
          onActivate();
        }
      } else if (clickCount === 1) {
        // Double click - back action
        onBack();
      }
      setClickCount(0);
    }, 300);
  };

  // Track mouse/touch position to highlight nearest menu button
  const handleTrackStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isMenuOpen) return;
    setIsDragging(true);
    updateAngleFromEvent(e);
    e.preventDefault();
  };

  const handleTrackMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !isMenuOpen) return;
    updateAngleFromEvent(e);
  };

  const handleTrackEnd = () => {
    if (isDragging && isMenuOpen) {
      onActivate(); // Activate the highlighted button on release
    }
    setIsDragging(false);
  };

  const updateAngleFromEvent = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let clientX, clientY;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const angle = (Math.atan2(deltaY, deltaX) * 180 / Math.PI + 90 + 360) % 360;
    
    onRotate(angle);
  };

  // Add keyboard controls for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMenuOpen) return;
      
      if (e.key === 'ArrowLeft') {
        onRotate((currentAngle - 45 + 360) % 360);
      } else if (e.key === 'ArrowRight') {
        onRotate((currentAngle + 45) % 360);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, currentAngle, onRotate, onActivate]);

  // Optional: Click on track ring to move to that position
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!isMenuOpen || isDragging) return;
    updateAngleFromEvent(e);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Track Ring - NO DOT, just the ring for dragging */}
      {isMenuOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute rounded-full border-8 cursor-pointer z-10"
          style={{
            width: '180px',
            height: '180px',
            borderColor: isDragging ? '#9CA3AF' : '#D1D5DB',
            transition: 'border-color 0.2s'
          }}
          onClick={handleTrackClick}
          onMouseDown={handleTrackStart}
          onMouseMove={handleTrackMove}
          onMouseUp={handleTrackEnd}
          onMouseLeave={handleTrackEnd}
          onTouchStart={handleTrackStart}
          onTouchMove={handleTrackMove}
          onTouchEnd={handleTrackEnd}
        />
      )}

      {/* Center Button - Main control */}
      <motion.button
        onClick={handleCenterClick}
        className="rounded-full flex items-center justify-center bg-white text-gray-700 shadow-xl hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 border-2 border-gray-300 z-30"
        style={{
          width: '100px',
          height: '100px',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isMenuOpen && (
          <span className="font-bold text-lg text-gray-700">Hi</span>
        )}
      </motion.button>
    </div>
  );
}