// File: /frontend/src/components/landing/AboutSection.tsx

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const AboutSection = () => {
  // Use our custom hook to get a ref and the in-view status.
  const [ref, isInView] = useInView({ threshold: 0.1 });

  // Animation variants for the container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  // Animation for items sliding in from the bottom
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
            From Developer Frustration to Solution
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-3xl mx-auto">
            Built by a developer, for developers. I created DevBot to solve the
            exact problems I faced every single day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Side: Image */}
          <motion.div className="lg:col-span-2" variants={slideUpVariant}>
            <img
              // Placeholder for your developer photo
              src="https://placehold.co/500x500/1f1f1f/ffffff?text=Your+Photo"
              alt="The developer of DevBot"
              className="rounded-full aspect-square object-cover shadow-lg border-4 border-primary/50"
            />
          </motion.div>

          {/* Right Side: Text and Stats */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            variants={slideUpVariant}
          >
            <p className="text-lg text-foreground/80">
              Like many of you, I spent countless hours wrestling with generic
              AI chatbots, trying to bend them to my will for complex coding
              tasks. The prompts were never quite right, the context was always
              missing, and the generated code often required heavy refactoring.
              It was a constant source of friction.
            </p>
            <p className="text-lg text-foreground/80">
              I knew there had to be a better way. That's why I built DevBot: an
              intelligent assistant that speaks our language, understands our
              frameworks, and is pre-optimized for the challenges we face. This
              isn't just another chatbot; it's the co-pilot I always wished I
              had.
            </p>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">80%</p>
                <p className="text-sm text-foreground/60">Faster Prompting</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">45%</p>
                <p className="text-sm text-foreground/60">
                  Better Code Quality
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
