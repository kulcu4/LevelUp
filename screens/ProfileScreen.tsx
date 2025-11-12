import React, { useState, useRef } from 'react';
import Card from '../components/ui/Card';
import { CogIcon, BellIcon, ShieldCheckIcon, PencilIcon, CameraIcon } from '../components/ui/Icons';

interface ProfileScreenProps {
  userName: string;
  userImage: string;
  setUserName: (name: string) => void;
  setUserImage: (image: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ userName, userImage, setUserName, setUserImage }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNameSave = () => {
    if (editedName.trim()) {
      setUserName(editedName.trim());
      setIsEditingName(false);
    }
  };

  const ProfileOption: React.FC<{icon: React.ReactNode, label: string, onClick?: () => void}> = ({ icon, label, onClick }) => (
     <button onClick={onClick} className="w-full text-left p-4 flex items-center space-x-4 hover:bg-base-300/50 transition-all duration-300 active:scale-[0.98] active:bg-base-300/70 rounded-lg hover:-translate-y-1">
        {icon}
        <span className="text-lg">{label}</span>
    </button>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <img src={userImage} alt="Profile" className="w-28 h-28 rounded-full border-4 border-primary object-cover" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Change profile picture"
          >
            <CameraIcon />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        
        <div className="relative w-full max-w-xs">
          {!isEditingName ? (
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-3xl font-bold text-white">{userName}</h1>
              <button onClick={() => { setIsEditingName(true); setEditedName(userName); }} className="p-1 rounded-full hover:bg-base-300 transition-all duration-300 active:scale-90 hover:-translate-y-0.5" aria-label="Edit name">
                <PencilIcon />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                className="w-full text-center bg-base-300 border border-base-300/50 rounded-lg px-3 py-2 text-white text-2xl font-bold focus:ring-2 focus:ring-primary focus:border-primary transition"
                autoFocus
              />
              <div className="flex space-x-2">
                <button onClick={handleNameSave} className="bg-primary hover:bg-secondary text-white font-bold py-1 px-4 rounded-lg transition-all duration-300 active:scale-95 hover:-translate-y-1">Save</button>
                <button onClick={() => setIsEditingName(false)} className="bg-base-300 hover:bg-base-300/70 text-white font-bold py-1 px-4 rounded-lg transition-all duration-300 active:scale-95 hover:-translate-y-1">Cancel</button>
              </div>
            </div>
          )}
        
      </header>

      <Card>
        <div className="p-2">
            <ProfileOption icon={<CogIcon />} label="Settings" />
            <ProfileOption icon={<BellIcon />} label="Notifications" />
            <ProfileOption icon={<ShieldCheckIcon />} label="Privacy & Security" />
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