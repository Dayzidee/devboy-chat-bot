// src/components/landing/HeroSection.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight, Zap } from "lucide-react";

const HeroSection = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="container py-28 md:py-40 lg:py-56">
      <motion.div
        className="flex flex-col items-center text-center max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Visual Element */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex items-center justify-center bg-primary/10 rounded-full p-4">
            <Zap className="h-12 w-12 text-primary" />
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-darker"
          variants={itemVariants}
        >
          Supercharge Your Development Workflow
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="mt-6 max-w-[700px] text-lg text-foreground/80 sm:text-xl"
          variants={itemVariants}
        >
          DevBot is your AI-powered pair programmer. Get instant answers, generate code, and debug faster with our pre-optimized prompts and developer-centric tools.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Start Building for Free
            <MoveRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
        <motion.p className="mt-4 text-sm text-foreground/60" variants={itemVariants}>
          No credit card required.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;