import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import HomeScreen from './screens/HomeScreen';
import PlannerScreen from './screens/PlannerScreen';
import InsightsScreen from './screens/InsightsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogMealScreen from './screens/LogMealScreen';
import MusicScreen from './screens/MusicScreen';
import { Tab, DailyLog, LoggedMeal, UserProfile, FitnessPlan, Song } from './types';

// --- Helper Functions for Calorie Estimation ---

/**
 * Estimates calories burned during a workout based on MET value.
 * @param focus - The focus of the workout (e.g., 'Upper Body Strength').
 * @param durationMinutes - The duration of the workout in minutes.
 * @param weightKg - The user's weight in kilograms.
 * @returns Estimated calories burned.
 */
const estimateWorkoutCalories = (focus: string, durationMinutes: number, weightKg: number): number => {
    let MET = 3.5; // Default for light activity
    const lowerCaseFocus = focus.toLowerCase();
    if (lowerCaseFocus.includes('strength') || lowerCaseFocus.includes('upper') || lowerCaseFocus.includes('lower') || lowerCaseFocus.includes('full body')) {
        MET = 5.0; // General strength training
    } else if (lowerCaseFocus.includes('cardio') || lowerCaseFocus.includes('hiit')) {
        MET = 8.0; // General cardio
    } else if (lowerCaseFocus.includes('yoga') || lowerCaseFocus.includes('flexibility') || lowerCaseFocus.includes('rest')) {
        MET = 2.5;
    }
    // Formula: (MET * 3.5 * weight in kg) / 200 * minutes
    return Math.round(((MET * 3.5 * weightKg) / 200) * durationMinutes);
};

/**
 * Estimates calories burned from steps.
 * @param steps - The number of steps taken.
 * @returns Estimated calories burned.
 */
const estimateStepCalories = (steps: number): number => {
    // A common approximation is 0.04 calories per step.
    return Math.round(steps * 0.04);
};

/**
 * Estimates calories burned during sleep.
 * @param sleepDurationHours - The duration of sleep in hours.
 * @param weightKg - The user's weight in kilograms.
 * @returns Estimated calories burned.
 */
const estimateSleepCalories = (sleepDurationHours: number, weightKg: number): number => {
    // Approximation: 0.95 kcal per kg per hour.
    return Math.round(sleepDurationHours * weightKg * 0.95);
};

// --- Sample Data ---
const samplePlaylist: Song[] = [
    { title: 'Push It', artist: 'Salt-N-Pepa', duration: '4:28' },
    { title: 'Eye of the Tiger', artist: 'Survivor', duration: '4:04' },
    { title: 'Lose Yourself', artist: 'Eminem', duration: '5:20' },
    { title: 'Stronger', artist: 'Kanye West', duration: '5:12' },
    { title: 'Remember the Name', artist: 'Fort Minor', duration: '3:50' },
    { title: 'Till I Collapse', artist: 'Eminem ft. Nate Dogg', duration: '4:57' },
];


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');  
  const [userImage, setUserImage] = useState('https://picsum.photos/100');
  const [userName, setUserName] = useState('Appleman');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [fitnessPlan, setFitnessPlan] = useState<FitnessPlan | null>(null);

  const [dailyLog, setDailyLog] = useState<DailyLog>({
    calories: 0,
    protein: 0,
    steps: 0,
    weight: 70,
    sleep: '0h 0m',
    meals: [],
    caloriesBurned: 0,
    workoutsCompleted: [],
    isTrackingSteps: false,
    isTrackingSleep: false,
    sleepStartTime: null,
  });

  const handlePlanGenerated = (plan: FitnessPlan, profile: UserProfile, maintenance: number) => {
    // If it's a full plan, just set it. If it's a partial plan, merge it with any existing full plan data.
    setFitnessPlan(prevPlan => {
        if (plan.workoutPlan.length === 7) {
            return plan; // Full plan replaces everything
        }
        if (prevPlan && plan.workoutPlan.length === 1) {
             // This case is mostly for the initial generation
             return plan;
        }
        return plan; // Set initial partial plan
    });

    setUserProfile(profile);
    const firstDayMealPlan = plan.mealPlan[0];
    if (firstDayMealPlan) {
        setDailyLog(prev => ({
            ...prev,
            caloriesGoal: parseInt(firstDayMealPlan.dailyTotals.calories, 10),
            proteinGoal: parseInt(firstDayMealPlan.dailyTotals.protein, 10),
            maintenanceCalories: maintenance,
            weight: profile.weight,
            workoutsCompleted: [], // Reset completed workouts on new plan
        }));
    }
  };
  
  const handleLogMeal = (meal: LoggedMeal) => {
    setDailyLog(prevLog => ({
      ...prevLog,
      calories: prevLog.calories + meal.calories,
      protein: prevLog.protein + meal.protein,
      meals: [...prevLog.meals, meal],
    }));
    setActiveTab('home'); // Go back to home screen after logging
  };

  const handleToggleWorkoutComplete = useCallback((workoutFocus: string) => {
    setDailyLog(prevLog => {
        const isCompleted = prevLog.workoutsCompleted.includes(workoutFocus);
        const newWorkoutsCompleted = isCompleted
            ? prevLog.workoutsCompleted.filter(w => w !== workoutFocus)
            : [...prevLog.workoutsCompleted, workoutFocus];
        
        return { ...prevLog, workoutsCompleted: newWorkoutsCompleted };
    });
  }, []);

  // --- Step & Sleep Tracking Logic ---

  const handleToggleStepTracking = useCallback(() => {
    setDailyLog(prev => ({ ...prev, isTrackingSteps: !prev.isTrackingSteps }));
  }, []);

  const handleResetSteps = useCallback(() => {
    setDailyLog(prev => ({ ...prev, steps: 0 }));
  }, []);
  
  const handleToggleSleepTracking = useCallback(() => {
    setDailyLog(prev => {
        const isStarting = !prev.isTrackingSleep;
        if (isStarting) {
            // Starting sleep tracking
            return {
                ...prev,
                isTrackingSleep: true,
                sleepStartTime: Date.now(),
            };
        } else {
            // Stopping sleep tracking
            const endTime = Date.now();
            const startTime = prev.sleepStartTime ?? endTime;
            const durationMs = endTime - startTime;
            const durationHours = durationMs / (1000 * 60 * 60);
            const hours = Math.floor(durationHours);
            const minutes = Math.round((durationHours - hours) * 60);
            const sleepString = `${hours}h ${minutes}m`;

            return {
                ...prev,
                isTrackingSleep: false,
                sleepStartTime: null,
                sleep: sleepString,
            };
        }
    });
  }, []);

  // Effect to simulate step counting
  useEffect(() => {
    let stepInterval: number | undefined;
    if (dailyLog.isTrackingSteps) {
        stepInterval = setInterval(() => {
            setDailyLog(prev => ({
                ...prev,
                steps: prev.steps + Math.floor(Math.random() * 3) + 1, // Add 1-3 steps
            }));
        }, 2000);
    }
    return () => clearInterval(stepInterval);
  }, [dailyLog.isTrackingSteps]);


  // Effect to recalculate burned calories whenever dependencies change
  useEffect(() => {
    const stepCalories = estimateStepCalories(dailyLog.steps);
    const weight = userProfile?.weight ?? dailyLog.weight;

    const workoutCalories = dailyLog.workoutsCompleted.reduce((total, focus) => {
        // Assume a 60-minute workout for estimation
        return total + estimateWorkoutCalories(focus, 60, weight);
    }, 0);

    let sleepCalories = 0;
    if (!dailyLog.isTrackingSleep) {
      const timeParts = dailyLog.sleep.match(/(\d+)h\s*(\d+)m/);
      if (timeParts) {
        const hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);
        const totalHours = hours + minutes / 60;
        sleepCalories = estimateSleepCalories(totalHours, weight);
      }
    }

    const totalBurned = stepCalories + workoutCalories + sleepCalories;

    if (totalBurned !== dailyLog.caloriesBurned) {
        setDailyLog(prevLog => ({ ...prevLog, caloriesBurned: totalBurned }));
    }
  }, [dailyLog.steps, dailyLog.workoutsCompleted, dailyLog.sleep, dailyLog.isTrackingSleep, userProfile?.weight, dailyLog.weight]);


  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen 
                  userName={userName} 
                  dailyLog={dailyLog}
                  fitnessPlan={fitnessPlan}
                  setActiveTab={setActiveTab}
                  onToggleWorkoutComplete={handleToggleWorkoutComplete}
                  onToggleStepTracking={handleToggleStepTracking}
                  onResetSteps={handleResetSteps}
                  onToggleSleepTracking={handleToggleSleepTracking}
               />;
      case 'planner':
        return <PlannerScreen onPlanGenerated={handlePlanGenerated} />;
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
      case 'music':
        return <MusicScreen playlist={samplePlaylist} />;
      default:
        return <HomeScreen userName={userName} dailyLog={dailyLog} fitnessPlan={fitnessPlan} setActiveTab={setActiveTab} onToggleWorkoutComplete={handleToggleWorkoutComplete} onToggleStepTracking={handleToggleStepTracking} onResetSteps={handleResetSteps} onToggleSleepTracking={handleToggleSleepTracking} />;
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