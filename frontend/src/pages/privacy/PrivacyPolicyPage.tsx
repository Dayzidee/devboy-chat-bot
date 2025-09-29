// src/pages/privacy/PrivacyPolicyPage.tsx

import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage: React.FC = () => {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, and information we get from your use of our services, like your usage data and device information.
          </p>

          <h2>2. How We Use Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect DevBot and our users. We also use this information to offer you tailored content.
          </p>

          <h2>3. Information We Share</h2>
          <p>
            We do not share personal information with companies, organizations, or individuals outside of DevBot except in the following cases: with your consent, for external processing, or for legal reasons.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We work hard to protect DevBot and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
          </p>

          <h2>5. Your Privacy Controls</h2>
          <p>
            You have choices regarding the information we collect and how it's used. You can review and update your account information at any time.
          </p>

          <h2>6. Changes to This Policy</h2>
          <p>
            We may change this Privacy Policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;