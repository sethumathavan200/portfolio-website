import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // This would integrate with a theme provider in a real app
    document.documentElement.classList.toggle('light');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 px-0 relative"
    >
      <motion.div
        initial={false}
        animate={{ 
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}