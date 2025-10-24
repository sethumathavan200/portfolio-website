import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface ChartData {
  name: string;
  value: number;
  color: string;
  icon?: React.ElementType;
}

interface InteractiveChartProps {
  data: ChartData[];
  type?: 'circular' | 'bar' | 'radial';
  className?: string;
}

export const InteractiveChart = ({ data, type = 'circular', className = "" }: InteractiveChartProps) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  if (type === 'circular') {
    return (
      <div className={`relative ${className}`}>
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="10"
            opacity="0.3"
          />
          {data.map((item, index) => {
            const circumference = 2 * Math.PI * 80;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference - (circumference * item.value) / 100;
            const isSelected = selectedItem === index;

            return (
              <motion.circle
                key={index}
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={item.color}
                strokeWidth={isSelected ? "12" : "10"}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: index * 0.2 }}
                onMouseEnter={() => setSelectedItem(index)}
                onMouseLeave={() => setSelectedItem(null)}
                className="cursor-pointer transition-all duration-200"
                style={{ 
                  transform: `rotate(${index * (360 / data.length)}deg)`,
                  transformOrigin: '100px 100px' 
                }}
              />
            );
          })}
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            animate={{ scale: selectedItem !== null ? 1.1 : 1 }}
          >
            <div className="text-2xl font-bold">
              {selectedItem !== null ? `${data[selectedItem].value}%` : 'Skills'}
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedItem !== null ? data[selectedItem].name : 'Overview'}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (type === 'radial') {
    return (
      <div className={`space-y-6 ${className}`}>
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="relative p-4 rounded-lg glass-card border-border/50 cursor-pointer"
            whileHover={{ scale: 1.02, y: -2 }}
            onMouseEnter={() => setSelectedItem(index)}
            onMouseLeave={() => setSelectedItem(null)}
          >
            <div className="flex items-center gap-4">
              {item.icon && (
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <item.icon 
                    className="w-6 h-6" 
                    style={{ color: item.color }}
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={item.value} 
                    className="h-3"
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Bar chart (default fallback)
  return (
    <div className={`space-y-4 ${className}`}>
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center gap-4 p-3 rounded-lg glass-card border-border/50 cursor-pointer"
          whileHover={{ scale: 1.01, x: 5 }}
          onMouseEnter={() => setSelectedItem(index)}
          onMouseLeave={() => setSelectedItem(null)}
        >
          <div className="w-20 text-sm font-medium">{item.name}</div>
          <div className="flex-1 relative">
            <div className="h-6 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </div>
          </div>
          <div className="w-12 text-sm font-medium text-right">{item.value}%</div>
        </motion.div>
      ))}
    </div>
  );
};