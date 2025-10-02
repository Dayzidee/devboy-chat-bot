import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code2, Sparkles, Zap } from "lucide-react";
import { useChatStore } from "@/stores/chatStore";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useChatStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 p-8 max-w-2xl"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code2 className="w-20 h-20 text-primary" />
          </motion.div>
        </div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          DevBot
        </h1>

        <p className="text-xl text-muted-foreground">
          Your AI-powered development assistant for frontend, backend, and beyond
        </p>

        <div className="grid grid-cols-3 gap-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-2"
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <p className="text-sm text-muted-foreground">Smart Assistance</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <Code2 className="w-8 h-8 text-secondary" />
            <p className="text-sm text-muted-foreground">Code Generation</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-2"
          >
            <Zap className="w-8 h-8 text-accent" />
            <p className="text-sm text-muted-foreground">Quick Solutions</p>
          </motion.div>
        </div>

        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
