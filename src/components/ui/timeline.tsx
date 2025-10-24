import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface TimelineItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  icon?: React.ElementType;
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = ({ items, className = "" }: TimelineProps) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      ref={targetRef}
      variants={containerVariants}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      className={`relative ${className}`}
    >
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="relative flex gap-6 group"
          >
            {/* Timeline dot */}
            <motion.div
              className="relative z-10 flex-shrink-0"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center glass-card border-2 border-primary/30 group-hover:border-primary transition-colors duration-300"
                style={{ 
                  backgroundColor: item.color ? `${item.color}20` : 'hsl(var(--primary) / 0.1)' 
                }}
              >
                {item.icon ? (
                  <item.icon 
                    className="w-5 h-5" 
                    style={{ color: item.color || 'hsl(var(--primary))' }}
                  />
                ) : (
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color || 'hsl(var(--primary))' }}
                  />
                )}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              className="flex-1 pb-8"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="glass-card border-border/50 p-6 rounded-lg group-hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    {item.subtitle && (
                      <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                  <motion.span 
                    className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.date}
                  </motion.span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};