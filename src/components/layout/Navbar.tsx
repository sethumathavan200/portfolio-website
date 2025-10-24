import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LogOut, User, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold gradient-text"
        >
          Portfolio
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary ${
                  location.pathname === item.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground hover:bg-primary/5'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg border border-primary/30"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">{user?.name}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;