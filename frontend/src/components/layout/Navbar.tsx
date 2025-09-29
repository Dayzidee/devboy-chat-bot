// src/components/layout/Navbar.tsx

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bot, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/features', text: 'Features' },
  { to: '/pricing', text: 'Pricing' },
  { to: '/contact', text: 'Contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeLinkStyle = {
    color: 'var(--primary-color)',
    fontWeight: 'bold',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-display">
          <Bot className="w-8 h-8 text-primary" />
          DevBot
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-foreground/70 hover:text-primary transition-colors"
              style={({ isActive }) => (isActive ? activeLinkStyle : {})}
            >
              {link.text}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-foreground/70 hover:text-primary transition-colors">
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary-darker transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <nav className="flex flex-col items-center p-4 gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-foreground/70 hover:text-primary transition-colors"
                  style={({ isActive }) => (isActive ? activeLinkStyle : {})}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </NavLink>
              ))}
              <div className="w-full border-t border-border my-2" />
              <Link
                to="/login"
                className="w-full text-center py-2 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="w-full text-center py-2 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary-darker transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;