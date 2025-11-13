import React from 'react';
import { HomeIcon, BoltIcon, ChartBarIcon, UserCircleIcon, MusicNoteIcon } from '../ui/Icons';
import { Tab } from '../../types';

interface NavbarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'text-primary';
  const inactiveClasses = 'text-gray-400 hover:text-white';
  
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full transition-all duration-300 active:scale-90 hover:-translate-y-1 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};


const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-base-200 border-t border-base-300 shadow-lg z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        <NavItem label="Home" icon={<HomeIcon />} isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavItem label="Planner" icon={<BoltIcon />} isActive={activeTab === 'planner'} onClick={() => setActiveTab('planner')} />
        <NavItem label="Insights" icon={<ChartBarIcon />} isActive={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
        <NavItem label="Music" icon={<MusicNoteIcon />} isActive={activeTab === 'music'} onClick={() => setActiveTab('music')} />        
        <NavItem label="Me" icon={<UserCircleIcon />} isActive={activeTab === 'me'} onClick={() => setActiveTab('me')} />
      </div>
    </nav>
  );
};

export default Navbar;