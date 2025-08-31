import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon, LogOut, Dumbbell } from 'lucide-react';
import LogoutModal from './LogoutModal';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
    navigate('/signin');
  };

  return (
    <>
      <nav className="bg-[var(--ui-background)] backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                 <Dumbbell className="h-8 w-8 text-cyan-500" />
                 <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                    FitForge
                 </span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                 <NavLink to={isAuthenticated ? "/dashboard" : "/"} className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-cyan-500' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}>
                    {isAuthenticated ? 'Dashboard' : 'Home'}
                </NavLink>
                <NavLink to="/contact" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-cyan-500' : 'text-slate-600 dark:text-slate-300 hover:text-cyan-500'}`}>
                    Contact Us
                </NavLink>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              {isAuthenticated ? (
                <>
                    <Link to="/profile">
                       <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${user?.username}`} alt="Profile" className="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 ring-cyan-500 hover:opacity-90 transition-opacity" />
                    </Link>
                    <button onClick={() => setIsModalOpen(true)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <LogOut className="h-5 w-5 text-red-500" />
                    </button>
                </>
              ) : (
                <div className="space-x-2">
                    <Link to="/signin" className="px-4 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Sign In</Link>
                    <Link to="/signup" className="px-4 py-2 text-sm font-medium rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-colors">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;