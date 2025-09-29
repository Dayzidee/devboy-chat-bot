// src/components/layout/Footer.tsx

import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold font-display mb-2">
              <Bot className="w-7 h-7 text-primary" />
              DevBot
            </Link>
            <p className="text-foreground/60 text-sm">&copy; {currentYear} DevBot. All rights reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-2">Navigation</h3>
            <ul className="space-y-1">
              <li><Link to="/features" className="text-foreground/70 hover:text-primary">Features</Link></li>
              <li><Link to="/pricing" className="text-foreground/70 hover:text-primary">Pricing</Link></li>
              <li><Link to="/contact" className="text-foreground/70 hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <h3 className="font-bold mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><Link to="/terms" className="text-foreground/70 hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-foreground/70 hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;