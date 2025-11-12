import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Song } from '../types';

interface MusicScreenProps {
  playlist: Song[];
}

const MusicScreen: React.FC<MusicScreenProps> = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlist[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Workout Music</h1>
        <p className="text-gray-400">Your motivational soundtrack.</p>
      </header>

      <Card>
        <div className="p-6 flex flex-col items-center space-y-4">
            <div className="w-32 h-32 bg-base-300 rounded-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 19.22a2.25 2.25 0 01-1.07-1.916V6.612a2.25 2.25 0 011.07-1.916l7.5-4.615a2.25 2.25 0 012.36 0L19.5 7.384" />
                </svg>
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">{currentTrack.title}</h2>
                <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
             <div className="w-full h-2 bg-base-300 rounded-full">
                <div className="w-1/2 h-full bg-primary rounded-full"></div>
            </div>
            <div className="flex items-center space-x-6">
                <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors duration-300">
                     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14.012V5.988a1 1 0 00-1.555-.824l-6 4.012a1 1 0 000 1.648l6 4.012zM15.445 14.832A1 1 0 0017 14.012V5.988a1 1 0 00-1.555-.824l-6 4.012a1 1 0 000 1.648l6 4.012z" /></svg>
                </button>
                 <button onClick={handlePlayPause} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                    {isPlaying ? (
                         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    ) : (
                         <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.012v3.976a1 1 0 001.555.824l3-1.988a1 1 0 000-1.648l-3-1.988z" /></svg>
                    )}
                </button>
                <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors duration-300">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M4.555 5.168A1 1 0 003 5.988v8.024a1 1 0 001.555.824l6-4.012a1 1 0 000-1.648l-6-4.012zM11.555 5.168A1 1 0 0010 5.988v8.024a1 1 0 001.555.824l6-4.012a1 1 0 000-1.648l-6-4.012z" /></svg>
                </button>
            </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
            <h3 className="text-xl font-semibold text-white mb-2">Playlist</h3>
            <ul className="divide-y divide-base-300">
                {playlist.map((song, index) => (
                    <li key={index} onClick={() => setCurrentTrackIndex(index)} className={`p-3 flex justify-between items-center cursor-pointer hover:bg-base-300/50 rounded-lg ${index === currentTrackIndex ? 'text-primary' : ''}`}>
                        <div>
                            <p className="font-semibold">{song.title}</p>
                            <p className="text-sm text-gray-400">{song.artist}</p>
                        </div>
                         {index === currentTrackIndex && isPlaying && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.636 5.636a9 9 0 0112.728 0M18.364 18.364A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                        )}
                    </li>
                ))}
            </ul>
        </div>
      </Card>
    </div>
  );
};

export default MusicScreen;