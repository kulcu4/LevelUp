import React from 'react';
import Card from '../components/ui/Card';
import { StepsIcon, MoonIcon, RefreshIcon } from '../components/ui/Icons';
import { DailyLog, FitnessPlan, Tab, DailyWorkout } from '../types';
import CaloriesTracker from '../components/home/CaloriesTracker';

const ToggleSwitch: React.FC<{ isChecked: boolean; onChange: () => void; }> = ({ isChecked, onChange }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-primary ${isChecked ? 'bg-primary' : 'bg-base-300'}`}
    >
        <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isChecked ? 'translate-x-6' : 'translate-x-1'}`}
        />
    </button>
);

interface TrackableStatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  colorClass: string;
  topRightControl?: React.ReactNode;
  bottomRightActions?: React.ReactNode;
}

const TrackableStatCard: React.FC<TrackableStatCardProps> = ({ icon, value, label, colorClass, topRightControl, bottomRightActions }) => (
  <Card className="flex flex-col p-4 space-y-2">
    <div className="flex justify-between items-center">
        <div className={`text-lg ${colorClass}`}>{icon}</div>
        {topRightControl}
    </div>
    <div className="flex-grow flex flex-col items-start">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{label}</div>
    </div>
    <div className="h-6 flex items-center justify-end space-x-2">
        {bottomRightActions}
    </div>
  </Card>
);

const PlannerCTA: React.FC<{ setActiveTab: (tab: Tab) => void }> = ({ setActiveTab }) => (
    <Card className="p-6 text-center">
        <h3 className="text-lg font-bold text-white">Set Your Calorie Target</h3>
        <p className="text-gray-400 mt-2 mb-4">
            Please complete the Planner section to calculate your daily calorie target.
            <span className="block text-xs mt-1">(Your maintenance and target calories come from the Planner.)</span>
        </p>
        <button 
            onClick={() => setActiveTab('planner')}
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 active:scale-95"
        >
            Go to Planner
        </button>
    </Card>
);

const TodaysWorkoutCard: React.FC<{
  workout: DailyWorkout;
  isCompleted: boolean;
  onToggleComplete: (focus: string) => void;
}> = ({ workout, isCompleted, onToggleComplete }) => (
  <div className="rounded-xl bg-gradient-to-br from-orange-500 to-primary p-6 text-white shadow-lg flex flex-col items-start">
    <h2 className="text-xl font-bold">Today's Focus</h2>
    <p className="mt-1 flex-grow">{workout.focus}</p>
    <button 
      onClick={() => onToggleComplete(workout.focus)}
      className={`mt-4 font-bold py-2 px-6 rounded-lg transition-all duration-300 active:scale-95 ${
        isCompleted 
        ? 'bg-green-500 text-white' 
        : 'bg-white text-primary'
      }`}
    >
      {isCompleted ? '✓ Completed!' : 'Mark as Complete'}
    </button>
  </div>
);

interface HomeScreenProps {
  userName: string;
  dailyLog: DailyLog;
  fitnessPlan: FitnessPlan | null;
  setActiveTab: (tab: Tab) => void;
  onToggleWorkoutComplete: (workoutFocus: string) => void;
  onSyncSteps: () => void;
  onResetSteps: () => void;
  onToggleStepTracking: () => void;
  onToggleSleepTracking: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName, dailyLog, fitnessPlan, setActiveTab, onToggleWorkoutComplete, onSyncSteps, onResetSteps, onToggleStepTracking, onToggleSleepTracking }) => {
    
    // Determine today's workout
    const getTodaysWorkout = () => {
        if (!fitnessPlan) return null;
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayString = daysOfWeek[new Date().getDay()];
        return fitnessPlan.workoutPlan.find(w => w.day.toLowerCase() === todayString.toLowerCase()) || null;
    }
    const todaysWorkout = getTodaysWorkout();

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-2xl font-bold text-white">Good Morning, {userName}!</h1>
        <p className="text-gray-400">Ready to crush your goals today?</p>
      </header>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">Today's Calories</h2>
        {fitnessPlan && dailyLog.caloriesGoal ? (
            <CaloriesTracker dailyLog={dailyLog} setActiveTab={setActiveTab} />
        ) : (
            <PlannerCTA setActiveTab={setActiveTab} />
        )}
      </section>

      {todaysWorkout && (
        <TodaysWorkoutCard 
            workout={todaysWorkout} 
            isCompleted={dailyLog.workoutsCompleted.includes(todaysWorkout.focus)}
            onToggleComplete={onToggleWorkoutComplete}
        />
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">Other Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <TrackableStatCard 
            icon={<StepsIcon />} 
            value={dailyLog.steps.toLocaleString()} 
            label={dailyLog.isTrackingSteps ? "Steps (Tracking...)" : "Steps"}
            colorClass="text-yellow-500"
            topRightControl={<ToggleSwitch isChecked={dailyLog.isTrackingSteps} onChange={onToggleStepTracking} />}
            bottomRightActions={
              <>
                <button 
                  onClick={onSyncSteps}
                  className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary transition-colors duration-300"
                  aria-label="Sync steps"
                >
                  <span>Sync</span>
                </button>
                <button 
                  onClick={onResetSteps}
                  className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary transition-colors duration-300"
                  aria-label="Reset steps"
                >
                  <RefreshIcon className="w-4 h-4" />
                </button>
              </>
            }
          />
          <TrackableStatCard 
            icon={<MoonIcon />} 
            value={dailyLog.isTrackingSleep ? "Tracking..." : dailyLog.sleep}
            label="Sleep" 
            colorClass="text-cyan-400"
            topRightControl={<ToggleSwitch isChecked={dailyLog.isTrackingSleep} onChange={onToggleSleepTracking} />}
            bottomRightActions={
                 dailyLog.isTrackingSleep && dailyLog.sleepStartTime && (
                    <p className="text-xs text-gray-500">
                        Start: {new Date(dailyLog.sleepStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                )
            }
          />
        </div>
      </section>
      
      <section>
         <h2 className="text-xl font-semibold mb-4 text-white">Achievement Board</h2>
         <Card className="flex items-center justify-center p-10 text-center">
             <p className="text-gray-400">Achievements and badges will be shown here. Keep up the good work!</p>
         </Card>
      </section>

    </div>
  );
};

export default HomeScreen;