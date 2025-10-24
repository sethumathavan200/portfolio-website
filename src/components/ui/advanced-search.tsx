import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
}

interface AdvancedSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, values: string[]) => void;
  onClearFilters: () => void;
  className?: string;
}

export const AdvancedSearch = ({
  searchTerm,
  onSearchChange,
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearFilters,
  className = ""
}: AdvancedSearchProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const totalActiveFilters = Object.values(activeFilters).flat().length;

  const handleFilterToggle = useCallback((groupId: string, value: string) => {
    const currentValues = activeFilters[groupId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(groupId, newValues);
  }, [activeFilters, onFilterChange]);

  const removeFilter = useCallback((groupId: string, value: string) => {
    const currentValues = activeFilters[groupId] || [];
    const newValues = currentValues.filter(v => v !== value);
    onFilterChange(groupId, newValues);
  }, [activeFilters, onFilterChange]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <motion.div
        className="relative"
        animate={{ 
          scale: searchFocused ? 1.02 : 1,
          y: searchFocused ? -2 : 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
        <Input
          placeholder="Search projects, skills, certificates..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="pl-12 pr-20 h-12 glass-card border-border/50 focus:border-primary/50 text-lg"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`relative ${totalActiveFilters > 0 ? 'text-primary' : ''}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            {totalActiveFilters > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
              >
                {totalActiveFilters}
              </Badge>
            )}
          </Button>
        </div>
      </motion.div>

      {/* Active Filters */}
      <AnimatePresence>
        {totalActiveFilters > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-wrap gap-2 items-center"
          >
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {Object.entries(activeFilters).map(([groupId, values]) =>
              values.map(value => {
                const group = filterGroups.find(g => g.id === groupId);
                const option = group?.options.find(o => o.value === value);
                return (
                  <motion.div
                    key={`${groupId}-${value}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 pr-1 cursor-pointer hover:bg-destructive/20"
                      onClick={() => removeFilter(groupId, value)}
                    >
                      {option?.label || value}
                      <X className="w-3 h-3" />
                    </Badge>
                  </motion.div>
                );
              })
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClearFilters}
              className="text-xs h-6 px-2"
            >
              Clear all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="glass-card border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterGroups.map((group) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                        {group.label}
                      </h4>
                      <div className="space-y-2">
                        {group.options.map((option) => {
                          const isChecked = (activeFilters[group.id] || []).includes(option.value);
                          return (
                            <motion.div
                              key={option.id}
                              className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                              whileHover={{ x: 2 }}
                              onClick={() => handleFilterToggle(group.id, option.value)}
                            >
                              <Checkbox
                                id={option.id}
                                checked={isChecked}
                                onChange={() => handleFilterToggle(group.id, option.value)}
                              />
                              <label
                                htmlFor={option.id}
                                className="text-sm cursor-pointer flex-1 flex justify-between"
                              >
                                {option.label}
                                {option.count && (
                                  <span className="text-muted-foreground">({option.count})</span>
                                )}
                              </label>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};