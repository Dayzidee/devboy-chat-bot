// src/components/landing/AboutSection.tsx

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "@/hooks/useInView";

// A reusable animated counter component
const AnimatedStat = ({ to, label }: { to: number; label: string }) => {
  const controls = useAnimation();
  const [ref, isInView] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start({
        // This is a custom property that framer-motion can animate
        number: to,
        transition: { duration: 2, ease: "circOut" },
      });
    }
  }, [isInView, to, controls]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="text-4xl font-bold text-primary"
        // Animate the custom 'number' property
        custom={{ number: 0 }}
        animate={controls}
        onUpdate={(latest) => {
          const pElement = ref.current?.querySelector('p');
          if (pElement) {
            pElement.textContent = `${Math.round(latest.number as number)}%`;
          }
        }}
      />
      <p className="text-sm text-foreground/60">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const slideUpVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24">
      <motion.div
        ref={ref}
        className="container max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={slideUpVariant}>
          <h2 className="text-4xl font-extrabold font-display">
            Built for Developers, By Developers
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Our mission is to eliminate the friction in AI-assisted development and build the tools we wish we had.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text */}
          <motion.div
            className="space-y-6"
            variants={slideUpVariant}
          >
            <p className="text-lg text-foreground/80">
              We got tired of wrestling with generic AI tools that didn't understand the nuances of coding. We spent more time engineering the perfect prompt than actually building.
            </p>
            <p className="text-lg text-foreground/80">
              DevBot is our solution. It's an intelligent assistant that speaks our language, understands our frameworks, and is pre-optimized for the challenges we face. This isn't just another chatbot; it's the co-pilot we always wanted.
            </p>
          </motion.div>

          {/* Right Side: Image and Stats */}
          <motion.div
            className="space-y-8"
            variants={slideUpVariant}
          >
            <img
              src="https://via.placeholder.com/500x300/1E1E1E/FFFFFF?text=Our+Team"
              alt="The DevBot Team"
              className="rounded-lg shadow-lg"
            />
            <div className="grid grid-cols-2 gap-6 pt-4">
              <AnimatedStat to={80} label="Faster Prompting" />
              <AnimatedStat to={45} label="Improved Code Quality" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;