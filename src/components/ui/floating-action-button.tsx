import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MessageCircle, Mail, Phone, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FABProps {
  className?: string;
}

export const FloatingActionButton = ({ className = "" }: FABProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const fabItems = [
    { icon: Mail, label: 'Email', action: () => window.location.href = 'mailto:contact@example.com' },
    { icon: Phone, label: 'Phone', action: () => window.location.href = 'tel:+1234567890' },
    { icon: Github, label: 'GitHub', action: () => window.open('https://github.com', '_blank') },
    { icon: MessageCircle, label: 'Chat', action: () => console.log('Open chat') },
  ];

  const toggleFAB = () => setIsOpen(!isOpen);

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <div className="relative">
        {/* Sub-actions */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 right-0 flex flex-col gap-3"
            >
              {fabItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 20, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    size="sm"
                    onClick={item.action}
                    className="glass-card bg-background/80 backdrop-blur-md border-border/50 hover:bg-primary/10 shadow-xl"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="ml-2 hidden sm:inline">{item.label}</span>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            onClick={toggleFAB}
            size="lg"
            className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-r from-primary to-primary-glow hover:shadow-primary/25 border-0"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};