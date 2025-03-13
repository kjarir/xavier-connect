
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, BookOpen, Calendar, Home, LogOut, Menu, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getNavItems = () => {
    if (!user) return [];

    const items = [
      { path: '/dashboard', label: 'Dashboard', icon: <Home size={18} /> },
    ];

    if (user.role === 'student' || user.role === 'teacher') {
      items.push(
        { path: '/courses', label: 'Courses', icon: <BookOpen size={18} /> },
        { path: '/calendar', label: 'Calendar', icon: <Calendar size={18} /> }
      );
    }

    if (user.role === 'admin') {
      items.push(
        { path: '/users', label: 'Users', icon: <User size={18} /> }
      );
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-xavier-500 to-xavier-700 text-white font-semibold">
            X
          </div>
          <span className="hidden md:flex font-semibold text-lg">Xavier Connect</span>
        </Link>

        {user && (
          <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1 transition-colors hover:text-foreground/80 ${
                  location.pathname === item.path
                    ? 'text-foreground font-medium'
                    : 'text-foreground/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="relative hover:bg-xavier-50">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-xavier-500 rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-xavier-100">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-xavier-100 text-xavier-800">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge
                        className="mt-1 w-fit capitalize bg-xavier-100 text-xavier-700 hover:bg-xavier-200"
                        variant="secondary"
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {navItems.map((item) => (
                      <DropdownMenuItem key={item.path} asChild>
                        <Link to={item.path} className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
