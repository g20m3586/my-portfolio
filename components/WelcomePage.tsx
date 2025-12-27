"use client"

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Mail, MapPin, Linkedin, Download, Briefcase } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

// 3D Animated Sphere - Fixed with proper TypeScript types
const AnimatedSphere = () => {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#ea580c"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.3}
      />
    </Sphere>
  );
};

const WelcomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-orange-900/40 to-orange-800/60 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
          />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-orange-900/30 to-orange-800/50 z-0"></div>

      {/* Top Bar */}
      <div className="relative z-20 pt-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Open to Work Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">Open to work</span>
            </div>
          </motion.div>

          {/* Download CV Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button className="px-4 py-2 md:px-6 md:py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-semibold text-sm transition-all shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95">
              <Download size={16} />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl font-bold text-white tracking-wider"
          >
            MONTY MHANGO
          </motion.div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-8"
          >
            {['HOME', 'SUMMARY', 'EXPERIENCE', 'SKILLS', 'CONTACT'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        className="relative z-30 md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 overflow-hidden"
      >
        <div className="px-4 py-4">
          {['HOME', 'SUMMARY', 'EXPERIENCE', 'SKILLS', 'CONTACT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 px-4 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Hero Content */}
      <main className="relative z-10 min-h-[calc(100vh-200px)] px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="order-2 lg:order-1 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-4"
              >
                <span className="inline-block px-4 py-1.5 bg-orange-500/20 text-orange-400 text-sm font-medium tracking-widest uppercase rounded-full border border-orange-500/30">
                  Technologist & Data Scientist
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Monty<br /><span className="text-orange-400">Mhango</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="space-y-4 mb-8"
              >
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                    <Mail size={18} className="text-orange-400" />
                  </div>
                  <span className="text-sm md:text-base">monty.mhango@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                    <Linkedin size={18} className="text-orange-400" />
                  </div>
                  <span className="text-sm md:text-base">linkedin.com/in/monty-mhango</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                    <MapPin size={18} className="text-orange-400" />
                  </div>
                  <span className="text-sm md:text-base">Johannesburg, South Africa</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              >
                Passionate technologist and aspiring Data Scientist dedicated to using data and technology to create real-world impact. Skills span Python, SQL, React, Salesforce, and UI/UX design.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 hover:scale-105 active:scale-95">
                  <Briefcase size={16} />
                  View Projects
                </button>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium text-sm transition-all backdrop-blur-sm border border-white/10 hover:scale-105 active:scale-95">
                  Contact Me
                </button>
              </motion.div>
            </div>

            {/* Right Side - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-transparent rounded-3xl blur-3xl"></div>
                
                {/* Image container */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl">
                  {/* Placeholder for profile image */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full mb-6 flex items-center justify-center">
                      <span className="text-7xl md:text-8xl">👤</span>
                    </div>
                    <p className="text-gray-400 text-center text-sm">
                      Replace with your professional photo
                    </p>
                    <p className="text-gray-500 text-center text-xs mt-2">
                      Recommended: 800x800px or larger
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-400/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar - Desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="bg-black/40 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-1 border border-white/10 shadow-2xl">
          {[
            { icon: '👤', label: 'Home' },
            { icon: '📄', label: 'Summary' },
            { icon: '💼', label: 'Experience' },
            { icon: '⚡', label: 'Skills' },
            { icon: '🔗', label: 'Links' }
          ].map((item, index) => (
            <button
              key={index}
              className="px-5 py-2.5 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 font-medium hover:scale-105 active:scale-95"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default WelcomePage;