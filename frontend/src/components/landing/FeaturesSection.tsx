// File: /frontend/src/components/landing/FeaturesSection.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { features } from "./featuresData";

const FeaturesSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <section className="py-24 bg-card/50">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold font-display">
            How DevBot Works
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            We've engineered a streamlined workflow to supercharge your
            development process.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Feature Selector (Left Side) */}
          <div className="w-full lg:w-1/3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                onClick={() => setSelectedTab(index)}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                  selectedTab === index
                    ? "bg-card border-primary scale-105 shadow-lg"
                    : "border-transparent hover:bg-card"
                }`}
              >
                <div className="flex items-center gap-4">
                  <feature.icon
                    className={`w-8 h-8 transition-colors ${selectedTab === index ? "text-primary" : "text-foreground/50"}`}
                  />
                  <h3 className="text-xl font-bold font-display">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-2 text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Feature Image Display (Right Side) */}
          <div className="w-full lg:w-2/3 h-[450px] bg-card rounded-xl p-4 border border-border">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <img
                  src={features[selectedTab].image}
                  alt={features[selectedTab].title}
                  className="w-full h-full object-cover rounded-md"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
