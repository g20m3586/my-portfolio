"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// 3D Animated Sphere
const AnimatedSphere = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#4a5568"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
};

const WelcomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

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
            I'm Monty Mhango
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