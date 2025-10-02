import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import Prism for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState(code);
  const { toast } = useToast();

  useEffect(() => {
    // Highlight code using Prism
    try {
      const grammar = Prism.languages[language] || Prism.languages.javascript;
      const highlighted = Prism.highlight(code, grammar, language);
      setHighlightedCode(highlighted);
    } catch (error) {
      // Fallback to plain text if highlighting fails
      setHighlightedCode(code);
    }
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard",
        variant: "destructive",
      });
    }
  };

  const codeBlockVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    transition: { duration: 0.4, ease: "easeInOut" }
  };

  return (
    <motion.div
      variants={codeBlockVariants}
      initial="initial"
      animate="animate"
      className="my-4 relative group"
    >
      <div className="flex items-center justify-between bg-muted/50 px-4 py-2 rounded-t-lg border border-border">
        <span className="text-sm font-medium text-muted-foreground capitalize">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      </div>
      
      <div className="relative">
        <pre className="bg-code-bg text-code-text p-4 rounded-b-lg border-l border-r border-b border-border overflow-x-auto">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </motion.div>
  );
};