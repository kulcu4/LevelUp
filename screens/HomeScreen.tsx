import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/ui/Card';
import { StepsIcon, MoonIcon, RefreshIcon, PlayIcon, PauseIcon } from '../components/ui/Icons';
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

const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const TodaysWorkoutCard: React.FC<{
  workout: DailyWorkout;
  isCompleted: boolean;
  onToggleComplete: (focus: string) => void;
}> = ({ workout, isCompleted, onToggleComplete }) => {
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [restSeconds, setRestSeconds] = useState(0);
    const isResting = restSeconds > 0;

    useEffect(() => {
        let interval: number | undefined;
        if (isTimerRunning && !isResting) {
            interval = window.setInterval(() => {
                setTimerSeconds(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, isResting]);

    useEffect(() => {
        let interval: number | undefined;
        if (isResting) {
            interval = window.setInterval(() => {
                setRestSeconds(prev => {
                    if (prev <= 1) {
                         // Optional: Play a sound
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isResting]);

    const handleStartStop = () => setIsTimerRunning(prev => !prev);
    const handleReset = () => {
        setIsTimerRunning(false);
        setTimerSeconds(0);
        setRestSeconds(0);
    };
    const startRest = (duration: number) => setRestSeconds(duration);

    return (
      <div className="rounded-xl bg-gradient-to-br from-orange-500 to-primary p-6 text-white shadow-lg flex flex-col">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-xl font-bold">Today's Focus</h2>
                <p className="mt-1 flex-grow">{workout.focus}</p>
            </div>
            <div className="text-right">
                <p className="text-3xl font-mono tracking-wider">{formatTime(timerSeconds)}</p>
                <p className="text-xs opacity-80">Workout Time</p>
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                 <button onClick={handleStartStop} className="p-2 bg-white/20 rounded-full hover:bg-white/30 active:scale-95">
                    {isTimerRunning && !isResting ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
                </button>
                 <button onClick={handleReset} className="p-2 bg-white/20 rounded-full hover:bg-white/30 active:scale-95">
                    <RefreshIcon className="w-5 h-5" />
                </button>
            </div>
            {isResting ? (
                 <div className="bg-cyan-400 text-base-100 font-bold py-2 px-4 rounded-lg">
                    Rest: {formatTime(restSeconds)}
                </div>
            ) : (
                <div className="flex items-center space-x-2 text-sm">
                    <span className="font-semibold">Rest:</span>
                    <button onClick={() => startRest(30)} className="py-1 px-3 bg-white/20 rounded-full hover:bg-white/30">30s</button>
                    <button onClick={() => startRest(60)} className="py-1 px-3 bg-white/20 rounded-full hover:bg-white/30">60s</button>
                    <button onClick={() => startRest(90)} className="py-1 px-3 bg-white/20 rounded-full hover:bg-white/30">90s</button>
                </div>
            )}
        </div>

        <button 
          onClick={() => onToggleComplete(workout.focus)}
          className={`mt-6 font-bold py-3 px-6 rounded-lg w-full transition-all duration-300 active:scale-95 ${
            isCompleted 
            ? 'bg-green-500 text-white' 
            : 'bg-white text-primary'
          }`}
        >
          {isCompleted ? '✓ Completed!' : 'Mark as Complete'}
        </button>
      </div>
    );
};


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