"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const WelcomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; radius: number; vx: number; vy: number; opacity: number; }[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const drawOrb = (centerX: number, centerY: number, radius: number, time: number) => {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `rgba(148, 163, 184, ${0.3 + Math.sin(time * 0.5) * 0.1})`);
      gradient.addColorStop(0.5, `rgba(100, 116, 139, ${0.2 + Math.sin(time * 0.5) * 0.05})`);
      gradient.addColorStop(1, 'rgba(71, 85, 105, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.6);
      innerGradient.addColorStop(0, `rgba(203, 213, 225, ${0.1 + Math.sin(time * 0.8) * 0.05})`);
      innerGradient.addColorStop(1, 'rgba(148, 163, 184, 0)');
      
      ctx.fillStyle = innerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw main orb
      const centerX = canvas.width / 2 + Math.sin(time * 0.5) * 50;
      const centerY = canvas.height / 2 + Math.cos(time * 0.3) * 30;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.25;
      const radius = baseRadius + Math.sin(time * 2) * 20;
      
      drawOrb(centerX, centerY, radius, time);

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = `rgba(148, 163, 184, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/90"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white"
        >
          MONTY MHANGO
        </motion.div>

        {/* Desktop Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center gap-8"
        >
          {['HOME', 'PROJECTS', 'ABOUT', 'CONTACT'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              whileHover={{ scale: 1.05 }}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="relative z-20 md:hidden bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 px-8 py-4"
        >
          {['HOME', 'PROJECTS', 'ABOUT', 'CONTACT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-sm font-medium text-gray-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-88px)] px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-white mb-4"
          >
            Welcome
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-4xl text-gray-300 mb-8"
          >
            I&apos;m Monty Mhango
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-3xl mx-auto"
          >
            I'm a passionate technologist and aspiring Data Scientist dedicated to using data and technology to create real-world impact. With a background in Computer Science and Information Systems, I thrive at the intersection of innovation, design, and social good. My skills span Python, SQL, React, Salesforce, and UI/UX design, allowing me to build data-driven, scalable applications with strong user experiences.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors shadow-2xl"
          >
            LEARN MORE
          </motion.button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
};

export default WelcomePage;