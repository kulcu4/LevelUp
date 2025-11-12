import React, { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import HomeScreen from './screens/HomeScreen';
import PlannerScreen from './screens/PlannerScreen';
import InsightsScreen from './screens/InsightsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogMealScreen from './screens/LogMealScreen';
import { Tab, DailyLog, LoggedMeal } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');  
  const [userImage, setUserImage] = useState('https://picsum.photos/100');
  const [userName, setUserName] = useState('Alex Ryder');
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    calories: 1230,
    protein: 80,
    steps: 8520,
    weight: 70,
    sleep: '7h 45m',
    meals: [],
  });
  
  const handleLogMeal = (meal: LoggedMeal) => {
    setDailyLog(prevLog => ({
      ...prevLog,
      calories: prevLog.calories + meal.calories,
      protein: prevLog.protein + meal.protein,
      meals: [...prevLog.meals, meal],
    }));
    setActiveTab('home'); // Go back to home screen after logging
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen 
                  userName={userName} 
                  dailyLog={dailyLog}
               />;
      case 'planner':
        return <PlannerScreen />;
      case 'insights':
        return <InsightsScreen dailyLog={dailyLog} />;
      case 'me':
        return <ProfileScreen 
                  userName={userName} 
                  userImage={userImage}
                  setUserName={setUserName}
                  setUserImage={setUserImage}
                />;
      case 'log_meal':
        return <LogMealScreen onLogMeal={handleLogMeal} />;
      default:
        return <HomeScreen userName={userName} dailyLog={dailyLog} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-content font-sans flex flex-col">
      <Header 
        setActiveTab={setActiveTab} 
        userName={userName}
        userImage={userImage}
      />
      <main className="flex-grow pb-24">
        {renderScreen()}
      </main>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;