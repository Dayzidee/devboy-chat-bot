// File: /frontend/src/components/layout/Footer.tsx

import { Link } from "react-router-dom";
import { BotMessageSquare, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border/40">
      <div className="container max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Mission */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BotMessageSquare className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl font-display">DevBot</span>
            </Link>
            <p className="text-foreground/60 max-w-sm">
              An AI-powered developer assistant designed to eliminate coding
              roadblocks and accelerate your workflow.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold font-display mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-bold font-display mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-foreground/50 mb-4 sm:mb-0">
            © {currentYear} DevBot. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="GitHub"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-foreground/60 hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
