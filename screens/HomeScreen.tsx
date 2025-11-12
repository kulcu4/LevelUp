import React from 'react';
import Card from '../components/ui/Card';
import { FlameIcon, StepsIcon, SleepIcon } from '../components/ui/Icons';
import { DailyLog } from '../types';

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; colorClass: string }> = ({ icon, value, label, colorClass }) => (
  <Card className="flex flex-col items-center justify-center p-4 text-center">
    <div className={`mb-2 ${colorClass}`}>{icon}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </Card>
);

interface HomeScreenProps {
  userName: string;
  dailyLog: DailyLog;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName, dailyLog }) => {
  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-2xl font-bold text-white">Good Morning, {userName}!</h1>
        <p className="text-gray-400">Ready to crush your goals today?</p>
      </header>
      
      <div className="rounded-xl bg-gradient-to-br from-orange-500 to-primary p-6 text-white shadow-lg flex flex-col items-start">
        <h2 className="text-xl font-bold">Today's Focus</h2>
        <p className="mt-1">Upper Body Strength & Cardio</p>
        <button className="mt-4 bg-white text-primary font-bold py-2 px-6 rounded-lg transition-transform duration-200 hover:scale-105 active:scale-100">
          Start Workout
        </button>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">Daily Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={<FlameIcon />} value={dailyLog.calories.toLocaleString()} label="Calories" colorClass="text-primary" />
          <StatCard icon={<StepsIcon />} value={dailyLog.steps.toLocaleString()} label="Steps" colorClass="text-yellow-500" />
          <StatCard icon={<SleepIcon />} value={dailyLog.sleep} label="Sleep" colorClass="text-yellow-400" />
        </div>
      </section>
      
      <section>
         <h2 className="text-xl font-semibold mb-4 text-white">Weekly Progress</h2>
         <Card className="flex items-center justify-center p-10 text-center">
             <p className="text-gray-400">Charts and progress visualizations will be shown here.</p>
         </Card>
      </section>

    </div>
  );
};

export default HomeScreen;