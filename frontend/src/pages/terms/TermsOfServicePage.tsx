// src/pages/terms/TermsOfServicePage.tsx

import React from 'react';
import { motion } from 'framer-motion';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold font-display sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to DevBot. These Terms of Service ("Terms") govern your use of our website and services. By using our services, you agree to these Terms.
          </p>

          <h2>2. Use of Our Services</h2>
          <p>
            You must follow any policies made available to you within the services. Don't misuse our services. For example, don't interfere with our services or try to access them using a method other than the interface and the instructions that we provide.
          </p>

          <h2>3. Your Account</h2>
          <p>
            You may need a DevBot account to use some of our services. You are responsible for the activity that happens on or through your account.
          </p>

          <h2>4. Privacy and Copyright Protection</h2>
          <p>
            DevBot's privacy policies explain how we treat your personal data and protect your privacy when you use our services. By using our services, you agree that DevBot can use such data in accordance with our privacy policies.
          </p>

          <h2>5. Your Content in Our Services</h2>
          <p>
            Some of our services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content. In short, what belongs to you stays yours.
          </p>

          <h2>6. Modifying and Terminating Our Services</h2>
          <p>
            We are constantly changing and improving our services. We may add or remove functionalities or features, and we may suspend or stop a service altogether.
          </p>

          <h2>7. Disclaimers and Limitations of Liability</h2>
          <p>
            We provide our services using a commercially reasonable level of skill and care and we hope that you will enjoy using them. But there are certain things that we don't promise about our services. Other than as expressly set out in these terms or additional terms, neither DevBot nor its suppliers or distributors make any specific promises about the services.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;