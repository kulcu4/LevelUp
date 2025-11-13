import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { Song } from '../types';
// FIX: Import MusicNoteIcon to fix 'Cannot find name' error.
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, MusicNoteIcon } from '../components/ui/Icons';

interface MusicScreenProps {
  playlist: Song[];
}

const MusicScreen: React.FC<MusicScreenProps> = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1; // Simulate progress
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrackIndex]);

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    setProgress(0);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Workout Music</h1>
        <p className="text-gray-400">Your motivational soundtrack.</p>
      </header>

      <Card>
        <div className="p-6 flex flex-col items-center space-y-4">
            <div className="w-40 h-40 bg-base-300 rounded-lg flex items-center justify-center shadow-lg">
                <MusicNoteIcon />
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">{currentTrack.title}</h2>
                <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
             <div className="w-full h-2 bg-base-300 rounded-full cursor-pointer">
                <div className="h-full bg-primary rounded-full" style={{width: `${progress}%`}}></div>
            </div>
            <div className="flex items-center space-x-6">
                <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors duration-300 active:scale-90">
                     <PrevIcon />
                </button>
                 <button onClick={handlePlayPause} className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300 active:scale-95">
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button onClick={handleNext} className="text-gray-400 hover:text-white transition-colors duration-300 active:scale-90">
                    <NextIcon />
                </button>
            </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
            <h3 className="text-xl font-semibold text-white mb-2">Playlist: Pump Up Mix</h3>
            <ul className="divide-y divide-base-300 max-h-60 overflow-y-auto">
                {playlist.map((song, index) => (
                    <li key={index} onClick={() => selectTrack(index)} className={`p-3 flex justify-between items-center cursor-pointer hover:bg-base-300/50 rounded-lg transition-all duration-200 ${index === currentTrackIndex ? 'bg-primary/20 text-primary' : ''}`}>
                        <div className="flex items-center space-x-3">
                           <span className="text-gray-400 w-4">{index + 1}.</span>
                            <div>
                                <p className="font-semibold">{song.title}</p>
                                <p className="text-sm text-gray-400">{song.artist}</p>
                            </div>
                        </div>
                         {index === currentTrackIndex && isPlaying ? (
                            <div className="flex space-x-1">
                                <span className="w-1 h-4 bg-primary rounded-full animate-[bounce_0.5s_ease-in-out_infinite]"></span>
                                <span className="w-1 h-4 bg-primary rounded-full animate-[bounce_0.7s_ease-in-out_infinite]"></span>
                                <span className="w-1 h-4 bg-primary rounded-full animate-[bounce_0.9s_ease-in-out_infinite]"></span>
                            </div>
                        ) : (
                           <span className="text-sm text-gray-500">{song.duration}</span>
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