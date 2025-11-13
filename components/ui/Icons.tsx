import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 2
};

export const HomeIcon = () => (
  <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

export const BoltIcon = () => (
  <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const ChartBarIcon = () => (
  <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const UserCircleIcon = () => (
  <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const MusicNoteIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 19.22a2.25 2.25 0 01-1.07-1.916V6.612a2.25 2.25 0 011.07-1.916l7.5-4.615a2.25 2.25 0 012.36 0L19.5 7.384" />
    </svg>
);

export const FlameIcon = ({className = iconProps.className}) => <svg {...iconProps} className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797A8.333 8.333 0 0112 2.25c1.153 0 2.243.3 3.218.834a8.22 8.22 0 01.144 2.13z" /></svg>;

export const StepsIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M4 16s5-4 8-1 5 3 8 0" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="4" cy="16" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/>
        <circle cx="20" cy="15" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
);


export const SleepIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
    </svg>
);

export const CogIcon = () => (
    <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.39.44 1.022.12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.164.398-.142.854.108 1.204l.527.738c.32.427.27 1.06-.12 1.45l-.773.773a1.125 1.125 0 01-1.45.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.15.893c-.09.543-.56.94-1.11.94h-1.093c-.55 0-1.02-.397-1.11-.94l-.149-.893c-.07-.425-.383-.765-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.427.32-1.06.27-1.45-.12l-.773-.773a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.272.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0 .55.398-1.02.94-1.11l.894-.149c.424-.07.764-.384.93-.78.164-.398.142-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.108.397-.165.71-.505.78-.93l.15-.893z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const BellIcon = () => (
    <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

export const ShieldCheckIcon = () => (
    <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
    </svg>
);

export const DeadliftIcon = ({className = "w-8 h-8 text-primary"}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12H2" />
      <path d="M22 12h-2" />
      <path d="M6 12V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
      <path d="M8 8V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M5 12c0 2.5 4 4 7 4s7-1.5 7-4" />
    </svg>
);

export const PencilIcon = () => (
    <svg {...iconProps} className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.5l-4.243 1.243 1.243-4.243L16.862 4.487z" />
    </svg>
);

export const CameraIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008v-.008z" />
    </svg>
);

export const PlusCircleIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const BrainIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const RefreshIcon = ({className = "w-5 h-5"}) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-5.22M20 15a9 9 0 01-14.13 5.22" />
    </svg>
);

export const MoonIcon = () => (
    <svg {...iconProps} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);


// --- Music & Integration Icons ---

export const SpotifyIcon = () => (
    <svg className="w-8 h-8 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.12c-.22.36-.68.49-1.04.27-2.9-1.78-6.52-2.19-10.87-1.19-.42.09-.73-.23-.82-.64-.09-.42.23-.73.64-.82C9.5 3.81 13.48 4.28 16.7 6.2c.36.22.49.68.27 1.04v-.12zm1.2-2.35c-.27.45-.83.6-1.28.33-3.24-1.98-8.15-2.58-11.89-1.4-.52.16-.9-.19-1.06-.71s.19-.9.71-1.06c4.26-1.32 9.75-.66 13.44 1.55.45.27.6.83.33 1.28v-.03zm.21-2.5c-.33.53-.98.7-1.51.36-3.64-2.22-9.5-2.43-13.22-1.33-.61.18-1.11-.22-1.29-.82-.18-.61.22-1.11.82-1.29 4.22-1.22 10.68-.97 14.8 1.52.53.33.7.98.36 1.51v-.02z" />
    </svg>
);

export const YoutubeMusicIcon = () => (
    <svg className="w-8 h-8 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 6.5 12 6.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
        <path d="M10 12.24v-1.48l2 1.48-2-1.48z" />
    </svg>
);


export const PlayIcon = ({className="w-8 h-8"}) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.012v3.976a1 1 0 001.555.824l3-1.988a1 1 0 000-1.648l-3-1.988z" /></svg>
);

export const PauseIcon = ({className="w-8 h-8"}) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
);

export const NextIcon = ({className="w-8 h-8"}) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M4.555 5.168A1 1 0 003 5.988v8.024a1 1 0 001.555.824l6-4.012a1 1 0 000-1.648l-6-4.012zM11.555 5.168A1 1 0 0010 5.988v8.024a1 1 0 001.555.824l6-4.012a1 1 0 000-1.648l-6-4.012z" /></svg>
);

export const PrevIcon = ({className="w-8 h-8"}) => (
     <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14.012V5.988a1 1 0 00-1.555-.824l-6 4.012a1 1 0 000 1.648l6 4.012zM15.445 14.832A1 1 0 0017 14.012V5.988a1 1 0 00-1.555-.824l-6 4.012a1 1 0 000 1.648l6 4.012z" /></svg>
);

export const CheckCircleIcon = ({className = "w-6 h-6"}) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const AppleHealthIcon = () => (
    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

export const FitbitIcon = () => (
  <svg className="w-8 h-8 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.8,10.46c-1.38,1-3.23.36-3.46-1.36-.2-1.51.89-2.93,2.27-3.94,1.38-1,3.23-.36,3.46,1.36.2,1.51-.89,2.94-2.27,3.94ZM11.33,9.1c-1.38,1-3.23.36-3.46-1.36S8.76,4.8,10.14,3.8c1.38-1,3.23-.36,3.46,1.36.2,1.51-.89,2.94-2.27,3.94Zm-1.8,5.42c-1.38,1-3.23.36-3.46-1.36-.2-1.51.89-2.93,2.27-3.94,1.38-1,3.23-.36,3.46,1.36.2,1.51-.89,2.94-2.27,3.94Zm9.39,4.24c-1.38,1-3.23.36-3.46-1.36-.2-1.51.89-2.93,2.27-3.94,1.38-1,3.23-.36,3.46,1.36.2,1.51-.89,2.94-2.27,3.94Zm-9.32,1.36c-1.38,1-3.23.36-3.46-1.36-.2-1.51.89-2.93,2.27-3.94,1.38-1,3.23-.36,3.46,1.36.2,1.51-.89,2.94-2.27,3.94Z"/>
  </svg>
);