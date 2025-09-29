// src/pages/pricing/PricingPage.tsx

import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals and hobbyists starting out.',
    features: [
      'Basic AI prompts',
      'Access to one AI model',
      '10 requests per day',
      'Community support',
    ],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Pro',
    price: '$15',
    description: 'For professional developers and small teams.',
    features: [
      'All Free features',
      'Advanced AI prompts',
      'Access to all AI models',
      '1,000 requests per day',
      'Priority email support',
    ],
    cta: 'Upgrade to Pro',
    isPopular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For large organizations with custom needs.',
    features: [
      'All Pro features',
      'Unlimited requests',
      'Dedicated support & onboarding',
      'Custom integrations',
      'Team management',
    ],
    cta: 'Contact Sales',
    isPopular: false,
  },
];

const PricingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          Choose Your Plan
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
          Simple, transparent pricing. No hidden fees.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.name}
            className={`p-8 bg-card rounded-lg border ${
              tier.isPopular ? 'border-primary' : 'border-border'
            } shadow-sm flex flex-col`}
            variants={itemVariants}
          >
            {tier.isPopular && (
              <div className="text-center mb-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold font-display text-center">{tier.name}</h2>
            <p className="text-4xl font-bold text-center my-4">{tier.price}<span className="text-lg font-normal text-foreground/70">{tier.name === 'Pro' && '/mo'}</span></p>
            <p className="text-foreground/70 text-center mb-6">{tier.description}</p>
            <ul className="space-y-4 mb-8 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to={tier.name === 'Enterprise' ? '/contact' : '/signup'}
              className={`w-full text-center py-3 rounded-md font-bold transition-colors ${
                tier.isPopular
                  ? 'bg-primary text-primary-foreground hover:bg-primary-darker'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {tier.cta}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PricingPage;