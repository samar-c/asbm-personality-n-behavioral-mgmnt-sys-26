
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, BarChart, Users, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navigation = ({ userRole = "student" }) => {
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
                {userRole === "admin" && (
                  <Link to="/admin" className="nav-link text-sm font-medium hover:underline flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
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
          <Link to="/reports" className="nav-link text-sm font-medium flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Reports
          </Link>
          {userRole === "admin" && (
            <Link to="/admin" className="nav-link text-sm font-medium flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin Panel
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>{userRole === "admin" ? "AD" : "ST"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer w-full flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
