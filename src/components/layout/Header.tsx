import { motion } from 'framer-motion';
import { Sparkles, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  transparent?: boolean;
}

export const Header = ({ transparent = false }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
        transparent ? 'bg-white/80 backdrop-blur-md' : 'bg-white shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-green-500 p-2 rounded-2xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              Curatify
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="/services"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Find Cleaners
            </a>
            <a
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              How it Works
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5 mr-2" />
              Login
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-100 bg-white"
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="/services"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Find Cleaners
            </a>
            <a
              href="/dashboard"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              How it Works
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="md" className="w-full">
                <User className="w-5 h-5 mr-2" />
                Login
              </Button>
              <Button variant="primary" size="md" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
