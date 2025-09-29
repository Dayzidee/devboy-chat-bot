// src/pages/features/FeaturesPage.tsx

import React from 'react';
import { features } from '@/components/landing/featuresData';
import { motion } from 'framer-motion';

const FeaturesPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div
        className="text-center mb-16"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold font-display sm:text-5xl md:text-6xl">
          Our Features
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Discover how DevBot can revolutionize your development workflow.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-8 bg-card rounded-lg border border-border shadow-sm"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4 mb-4">
              <feature.icon className="w-10 h-10 text-primary" />
              <h2 className="text-2xl font-bold font-display">{feature.title}</h2>
            </div>
            <p className="text-foreground/70">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturesPage;