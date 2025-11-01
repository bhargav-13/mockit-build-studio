import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Music, Mail, Gamepad2, MessageSquare, Calendar, Gift, Heart, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/gallery', label: 'Gallery', icon: Camera },
  { to: '/playlist', label: 'Playlist', icon: Music },
  { to: '/letters', label: 'Letters', icon: Mail },
  { to: '/games', label: 'Games', icon: Gamepad2 },
  { to: '/wish-wall', label: 'Wishes', icon: MessageSquare },
  { to: '/timeline', label: 'Timeline', icon: Calendar },
  { to: '/surprises', label: 'Surprises', icon: Gift },
  { to: '/about', label: 'About Us', icon: Heart },
];

export const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 glass border-b border-primary/20 shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Catchy Mager */}
            <Link to="/" className="font-catchy text-xl md:text-2xl text-primary hover:scale-105 transition-transform no-underline">
              Aadi's 24th 💕
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full font-catchy transition-all no-underline",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[var(--shadow-romantic)]"
                        : "hover:bg-muted text-foreground/70 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 right-0 bottom-0 w-64 glass border-l border-primary/20 shadow-[var(--shadow-romantic)] animate-slide-in-right">
            <div className="flex flex-col p-4 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl font-catchy transition-all no-underline",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[var(--shadow-romantic)]"
                        : "hover:bg-muted text-foreground/70 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};