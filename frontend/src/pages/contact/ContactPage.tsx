// src/pages/contact/ContactPage.tsx

import React from 'react';
import ContactSection from '@/components/landing/ContactSection';
import { motion } from 'framer-motion';

const ContactPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32">
      <motion.div
        className="text-center mb-16"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold font-display sm:text-5xl md:text-6xl">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          We're here to help. Reach out to us with any questions or feedback.
        </p>
      </motion.div>
      <ContactSection />
    </div>
  );
};

export default ContactPage;