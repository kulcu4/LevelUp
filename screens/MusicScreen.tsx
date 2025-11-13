import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { Song } from '../types';
import { PlayIcon, PauseIcon, NextIcon, PrevIcon, MusicNoteIcon, SpotifyIcon, YoutubeMusicIcon } from '../components/ui/Icons';

interface MusicScreenProps {
  playlist: Song[];
  playlistTitle: string;
  source: 'youtube' | 'spotify' | 'default';
}

const MusicScreen: React.FC<MusicScreenProps> = ({ playlist, playlistTitle, source }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset state when playlist changes
  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [playlist]);

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
          return prev + 1.2; // Simulate progress slightly faster
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
  
  const getBrandClasses = () => {
    switch(source) {
      case 'youtube': return { text: 'text-youtube', bg: 'bg-youtube' };
      case 'spotify': return { text: 'text-spotify', bg: 'bg-spotify' };
      default: return { text: 'text-primary', bg: 'bg-primary' };
    }
  }
  const brandClasses = getBrandClasses();

  const getAlbumArt = () => {
    switch(source) {
      case 'youtube': return <YoutubeMusicIcon />;
      case 'spotify': return <SpotifyIcon />;
      default: return <MusicNoteIcon />;
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className={`text-3xl font-bold text-white transition-colors duration-500`}>Workout Music</h1>
        <p className="text-gray-400">Your motivational soundtrack, powered by <span className={`font-bold capitalize ${brandClasses.text}`}>{source === 'default' ? 'Level Up' : source}</span>.</p>
      </header>

      <Card>
        <div className="p-6 flex flex-col items-center space-y-4">
            <div className={`w-40 h-40 bg-base-300 rounded-lg flex items-center justify-center shadow-lg transition-colors duration-500 ${brandClasses.bg}/20`}>
                {getAlbumArt()}
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">{currentTrack.title}</h2>
                <p className="text-gray-400">{currentTrack.artist}</p>
            </div>
             <div className="w-full h-2 bg-base-300 rounded-full cursor-pointer">
                <div className={`h-full rounded-full transition-all duration-500 ${brandClasses.bg}`} style={{width: `${progress}%`}}></div>
            </div>
            <div className="flex items-center space-x-6">
                <button onClick={handlePrev} className="text-gray-400 hover:text-white transition-colors duration-300 active:scale-90">
                     <PrevIcon />
                </button>
                 <button onClick={handlePlayPause} className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-all duration-500 active:scale-95 ${brandClasses.bg}`}>
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
            <h3 className="text-xl font-semibold text-white mb-2">{playlistTitle}</h3>
            <ul className="divide-y divide-base-300 max-h-60 overflow-y-auto">
                {playlist.map((song, index) => (
                    <li key={index} onClick={() => selectTrack(index)} className={`p-3 flex justify-between items-center cursor-pointer hover:bg-base-300/50 rounded-lg transition-all duration-200 ${index === currentTrackIndex ? `${brandClasses.bg}/20 ${brandClasses.text}` : ''}`}>
                        <div className="flex items-center space-x-3">
                           <span className="text-gray-400 w-4">{index + 1}.</span>
                            <div>
                                <p className="font-semibold">{song.title}</p>
                                <p className="text-sm text-gray-400">{song.artist}</p>
                            </div>
                        </div>
                         {index === currentTrackIndex && isPlaying ? (
                            <div className="flex space-x-1">
                                <span className={`w-1 h-4 rounded-full animate-[bounce_0.5s_ease-in-out_infinite] ${brandClasses.bg}`}></span>
                                <span className={`w-1 h-4 rounded-full animate-[bounce_0.7s_ease-in-out_infinite] ${brandClasses.bg}`}></span>
                                <span className={`w-1 h-4 rounded-full animate-[bounce_0.9s_ease-in-out_infinite] ${brandClasses.bg}`}></span>
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