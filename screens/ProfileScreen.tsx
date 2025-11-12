
import React from 'react';
import Card from '../components/ui/Card';
import { CogIcon, BellIcon, ShieldCheckIcon } from '../components/ui/Icons';

const ProfileScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header className="flex items-center space-x-4">
        <img src="https://picsum.photos/100" alt="Profile" className="w-20 h-20 rounded-full border-4 border-primary" />
        <div>
            <h1 className="text-3xl font-bold text-white">Alex Ryder</h1>
            <p className="text-gray-400">alex.ryder@example.com</p>
        </div>
      </header>

      <Card>
        <div className="divide-y divide-base-300">
            <div className="p-4 flex items-center space-x-4 hover:bg-base-300/50 transition-colors">
                <CogIcon />
                <span className="text-lg">Settings</span>
            </div>
            <div className="p-4 flex items-center space-x-4 hover:bg-base-300/50 transition-colors">
                <BellIcon />
                <span className="text-lg">Notifications</span>
            </div>
            <div className="p-4 flex items-center space-x-4 hover:bg-base-300/50 transition-colors">
                <ShieldCheckIcon />
                <span className="text-lg">Privacy & Security</span>
            </div>
        </div>
      </Card>

       <Card>
        <div className="p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Integrations</h2>
            <p className="text-gray-300 mb-4">
                Connect your favorite health apps. (Coming Soon)
            </p>
            <div className="flex justify-center space-x-4 text-gray-500 text-2xl">
                <span>Apple Health</span>
                <span>Google Fit</span>
                <span>Garmin</span>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileScreen;
