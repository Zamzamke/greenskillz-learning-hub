import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/dashboard' },
    { name: 'XP', path: '/leaderboard' },
    { name: 'Shop', path: '/shop' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Profile', path: '/profile' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between p-4 bg-card shadow-eco border-b">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-primary rounded-xl">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold gradient-text">GreenSkillz</span>
        </Link>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-foreground hover:bg-muted hover:scale-105'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Button className="btn-eco">Get Started</Button>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <div className="flex items-center justify-between p-4 bg-card shadow-eco border-b">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">GreenSkillz</span>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className={`w-full h-0.5 bg-foreground transition-all ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <div className={`w-full h-0.5 bg-foreground transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-full h-0.5 bg-foreground transition-all ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </div>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-card border-b shadow-eco p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="btn-eco w-full mt-4">Get Started</Button>
          </div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t shadow-eco">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? 'text-primary scale-110'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`w-6 h-6 ${isActive(item.path) ? 'bg-primary rounded-full' : ''}`}>
                <Leaf className="w-full h-full" />
              </div>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;