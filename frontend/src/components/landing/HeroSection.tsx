// File: /frontend/src/components/landing/HeroSection.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";

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
        {/* Main Headline */}
        <motion.h1
          className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-darker"
          variants={itemVariants}
        >
          Eliminate Coding Roadblocks
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="mt-6 max-w-[700px] text-lg text-foreground/80 sm:text-xl"
          variants={itemVariants}
        >
          DevBot provides pre-optimized AI prompts and developer-specific modes
          to make AI-assisted development faster and more accessible than ever
          before.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Get Started For Free
            <MoveRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
