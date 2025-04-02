
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navigation = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col gap-4 p-2">
                <Link to="/" className="text-lg font-semibold mb-4">
                  ASBM University
                </Link>
                <Link to="/" className="nav-link text-sm font-medium hover:underline">
                  Dashboard
                </Link>
                <Link to="/calendar" className="nav-link text-sm font-medium hover:underline">
                  Calendar
                </Link>
                <Link to="/todo" className="nav-link text-sm font-medium hover:underline">
                  To-do
                </Link>
                <Link to="/reports" className="nav-link text-sm font-medium hover:underline">
                  Reports
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <div className="text-xl font-bold text-primary">ASBM University</div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link text-sm font-medium">
            Dashboard
          </Link>
          <Link to="/calendar" className="nav-link text-sm font-medium">
            Calendar
          </Link>
          <Link to="/todo" className="nav-link text-sm font-medium">
            To-do
          </Link>
          <Link to="/reports" className="nav-link text-sm font-medium">
            Reports
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="" alt="Student" />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
