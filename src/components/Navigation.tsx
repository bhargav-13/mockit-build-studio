import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Music, Mail, Gamepad2, MessageSquare, Calendar, Gift, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <nav className="sticky top-0 z-40 glass border-b border-primary/20 shadow-[var(--shadow-soft)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-cursive text-2xl text-primary hover:scale-105 transition-transform no-underline">
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
                    "flex items-center gap-2 px-4 py-2 rounded-full font-serif transition-all no-underline",
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

          {/* Mobile menu - simplified for now */}
          <div className="md:hidden">
            <Link to="/" className="text-primary no-underline">
              <Home className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
