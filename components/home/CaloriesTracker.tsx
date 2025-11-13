import React from 'react';
import { DailyLog, Tab } from '../../types';
import Card from '../ui/Card';
import { PlusCircleIcon, FlameIcon } from '../ui/Icons';

interface CaloriesTrackerProps {
    dailyLog: DailyLog;
    setActiveTab: (tab: Tab) => void;
}

// A component for the circular progress bar
const ProgressCircle: React.FC<{ percentage: number; color: string; size?: number; strokeWidth?: number }> = ({ percentage, color, size = 120, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle
                className="text-base-300"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className={color}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
        </svg>
    );
};


const CaloriesTracker: React.FC<CaloriesTrackerProps> = ({ dailyLog, setActiveTab }) => {
    const { calories, caloriesGoal = 0, caloriesBurned, maintenanceCalories = 0 } = dailyLog;
    const remaining = caloriesGoal - calories + caloriesBurned;
    const percentage = caloriesGoal > 0 ? (calories / caloriesGoal) * 100 : 0;

    const isOver = calories > caloriesGoal;
    const statusColor = remaining < 0 ? 'text-red-500' : 'text-green-500';
    const progressColor = isOver ? 'text-red-500' : 'text-primary';

    const statusMessage = remaining < 0 
        ? "You're over your net goal. That's okay, tomorrow is a new day!"
        : "You're on track. Great job!";

    return (
        <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* Left Side: Stats */}
                 <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center w-full">
                    <div>
                        <p className="text-xl font-bold text-white">{calories.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Intake</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold text-teal-400">+{caloriesBurned.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Burned</p>
                    </div>
                     <div>
                        <p className="text-xl font-bold text-primary">{caloriesGoal.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Goal</p>
                    </div>
                    <div>
                        <p className={`text-xl font-bold ${statusColor}`}>{remaining.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Remaining</p>
                    </div>
                </div>

                {/* Right Side: Progress Circle & CTA */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ProgressCircle percentage={percentage} color={progressColor} size={100} strokeWidth={8} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-white">{Math.round(percentage)}%</span>
                             <span className="text-xs text-gray-400">of Goal</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setActiveTab('log_meal')}
                        className="flex flex-col items-center justify-center p-2 rounded-lg bg-base-300/50 hover:bg-base-300 transition-all active:scale-95 group h-full w-20"
                        aria-label="Log Cal.Intake"
                    >
                        <PlusCircleIcon />
                        <span className="text-xs mt-1 text-gray-400 group-hover:text-white">Log Meal</span>
                    </button>
                </div>
            </div>

            {/* Bottom Section: Status Message & Maintenance */}
            <div className="mt-4 pt-4 border-t border-base-300 text-center">
                <p className={`text-sm ${statusColor}`}>{statusMessage}</p>
                <p className="text-xs text-gray-500 mt-2 flex items-center justify-center">
                    <FlameIcon className="w-4 h-4 inline-block mr-1" />
                    Est. Maintenance: {maintenanceCalories.toLocaleString()} kcal
                </p>
            </div>
        </Card>
    );
};

export default CaloriesTracker;
