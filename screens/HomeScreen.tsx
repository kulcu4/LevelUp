
import React from 'react';
import Card from '../components/ui/Card';
import { FlameIcon, FootprintsIcon, BedIcon } from '../components/ui/Icons';

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string; colorClass: string }> = ({ icon, value, label, colorClass }) => (
  <Card className="flex flex-col items-center justify-center p-4 text-center">
    <div className={`mb-2 ${colorClass}`}>{icon}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </Card>
);

const HomeScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Good Morning, Alex!</h1>
        <p className="text-gray-400">Ready to crush your goals today?</p>
      </header>
      
      <section className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 shadow-lg text-white">
        <h2 className="text-xl font-bold mb-2">Today's Focus</h2>
        <p>Upper Body Strength & Cardio</p>
        <button className="mt-4 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition-all">
          Start Workout
        </button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">Daily Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={<FlameIcon />} value="1,230" label="Calories" colorClass="text-primary" />
          <StatCard icon={<FootprintsIcon />} value="8,520" label="Steps" colorClass="text-secondary" />
          <StatCard icon={<BedIcon />} value="7h 45m" label="Sleep" colorClass="text-accent" />
        </div>
      </section>
      
      <section>
         <h2 className="text-xl font-semibold mb-4 text-white">Weekly Progress</h2>
         <Card>
            <div className="p-4">
               <p className="text-center text-gray-400">Charts and progress visualizations will be shown here.</p>
                <div className="h-40 flex items-center justify-center">
                    <span className="italic">Coming Soon</span>
                </div>
            </div>
         </Card>
      </section>

    </div>
  );
};

export default HomeScreen;
