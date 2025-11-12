import React from 'react';
import { DeadliftIcon } from '../ui/Icons';
import { Tab } from '../../types';

interface HeaderProps {
  setActiveTab: (tab: Tab) => void;
  userName: string;
  userImage: string;
}

const Header: React.FC<HeaderProps> = ({ setActiveTab, userName, userImage }) => {
  return (
    <header className="px-4 sm:px-6 py-3 bg-base-200/80 backdrop-blur-sm border-b border-base-300/50 sticky top-0 z-40 flex items-center justify-between">
      <button 
        className="flex items-center space-x-3 group transition-transform duration-300 active:scale-95 hover:-translate-y-1"
        onClick={() => setActiveTab('home')}
        aria-label="Go to home page"
      >
        <DeadliftIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
        <span className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300 tracking-wider">
          Level Up
        </span>
      </button>

      <button
        className="flex items-center space-x-2 group transition-all duration-300 active:scale-95 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 shadow-lg rounded-full pl-1 pr-3 py-1 hover:-translate-y-1"
        onClick={() => setActiveTab('me')}
        aria-label="Go to profile page"
      >
        <img src={userImage} alt="Profile" className="w-9 h-9 rounded-full border-2 border-white/30 group-hover:border-primary transition-colors object-cover" />
        <span className="text-sm font-medium text-gray-300 group-hover:text-white">{userName}</span>
      </button>
    </header>
  );
};

export default Header;