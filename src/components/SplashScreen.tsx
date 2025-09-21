import React from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 flex flex-col items-center justify-center text-white">
      <motion.div 
        className="flex flex-col items-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <motion.div
          className="relative"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
            <Shield className="h-16 w-16 text-white" />
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-2">PayGuard</h1>
          <p className="text-lg text-blue-100">Your AI-powered fraud shield</p>
        </motion.div>

        {/* Loading Animation */}
        <motion.div 
          className="flex space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 bg-white rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Text */}
      <motion.p 
        className="absolute bottom-8 text-sm text-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        Protecting your financial security
      </motion.p>
    </div>
  );
}