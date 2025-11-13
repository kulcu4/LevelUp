import React, { useState } from 'react';
import { FitnessPlan, DailyWorkout, DailyMealPlan, Exercise } from '../../types';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { DeadliftIcon } from '../ui/Icons';

interface PlanDisplayProps {
    plan: FitnessPlan;
    isGeneratingFullPlan: boolean;
}

const ExerciseAnimationPlaceholder: React.FC<{ exerciseName: string }> = ({ exerciseName }) => {
    const lowerCaseName = exerciseName.toLowerCase();

    if (lowerCaseName.includes('deadlift')) {
        return (
            <div className="flex justify-center items-center h-24 bg-base-100/50 rounded-lg p-4">
                <style>{`
                    @keyframes deadlift-anim {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-15px); }
                    }
                    .deadlift-icon-anim { animation: deadlift-anim 2s ease-in-out infinite; }
                `}</style>
                <DeadliftIcon className="w-12 h-12 text-primary deadlift-icon-anim" />
                <p className="ml-4 text-sm text-gray-400">Simulating deadlift motion...</p>
            </div>
        );
    }

    // Generic placeholder for other exercises
    return (
        <div className="flex justify-center items-center h-24 bg-base-100/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">Animation for "{exerciseName}" coming soon.</p>
        </div>
    );
};


const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, isGeneratingFullPlan }) => {
    const [activeTab, setActiveTab] = useState<'workout' | 'meal'>('workout');
    const [activeDay, setActiveDay] = useState<number>(0);
    const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
    const [showAnimation, setShowAnimation] = useState(false);

    const toggleExercise = (index: number) => {
        if (expandedExercise === index) {
            setExpandedExercise(null);
            setShowAnimation(false);
        } else {
            setExpandedExercise(index);
            setShowAnimation(false);
        }
    };


    const DaySelector: React.FC<{planDays: string[], onSelect: (index: number) => void, currentDay: number}> = ({planDays, onSelect, currentDay}) => (
        <div className="flex items-center space-x-2">
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 flex-grow">
                {planDays.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(index)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 active:scale-95 hover:-translate-y-1 ${
                            currentDay === index
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-base-300 text-gray-300 hover:bg-base-300/70'
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
            {isGeneratingFullPlan && (
                <div className="flex items-center space-x-2 text-xs text-gray-400 pr-4">
                    <Spinner />
                    <span>Loading week...</span>
                </div>
            )}
        </div>
    );

    const WorkoutDetails: React.FC<{ dayPlan: DailyWorkout }> = ({ dayPlan }) => (
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{dayPlan.focus}</h3>
            {!dayPlan.exercises || dayPlan.exercises.length === 0 ? (
                 <p className="text-gray-400">Rest day! Enjoy your recovery.</p>
            ) : (
                <ul className="divide-y divide-base-300">
                    {dayPlan.exercises.map((ex, i) => (
                        <li key={i} className="py-4 cursor-pointer" onClick={() => toggleExercise(i)}>
                            <h4 className="font-semibold text-lg text-secondary">{ex.name}</h4>
                            <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                                <p><span className="font-bold">Sets:</span> {ex.sets}</p>
                                <p><span className="font-bold">Reps:</span> {ex.reps}</p>
                                <p><span className="font-bold">Rest:</span> {ex.rest}</p>
                            </div>
                            <p className="text-gray-400 mt-2 text-sm italic">Tip: {ex.tips}</p>
                             <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedExercise === i ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                <div className="space-y-3 pt-2">
                                    <p className="text-sm text-gray-300">{ex.description}</p>
                                    <div>
                                        <h5 className="font-bold text-sm text-white">Proper Form:</h5>
                                        <p className="text-sm text-gray-400">{ex.formTips}</p>
                                    </div>
                                     <div>
                                        <h5 className="font-bold text-sm text-white">Common Mistakes:</h5>
                                        <p className="text-sm text-gray-400">{ex.commonMistakes}</p>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setShowAnimation(prev => !prev); }}
                                        className="text-xs bg-cyan-400/20 text-cyan-100 px-3 py-1 rounded-full hover:bg-cyan-400/40"
                                    >
                                        {showAnimation ? 'Hide Animation' : 'Show Animation'}
                                    </button>
                                     {showAnimation && <ExerciseAnimationPlaceholder exerciseName={ex.name} />}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    const MealDetails: React.FC<{ dayPlan: DailyMealPlan }> = ({ dayPlan }) => (
        <div className="space-y-4">
            <Card className="p-4 bg-base-300">
                <h4 className="text-lg font-bold text-center text-white">Daily Totals</h4>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm mt-2">
                    <div><p className="font-bold text-secondary">{dayPlan.dailyTotals.calories}</p><p className="text-gray-400">Calories</p></div>
                    <div><p className="font-bold text-secondary">{dayPlan.dailyTotals.protein}g</p><p className="text-gray-400">Protein</p></div>
                    <div><p className="font-bold text-secondary">{dayPlan.dailyTotals.carbs}g</p><p className="text-gray-400">Carbs</p></div>
                    <div><p className="font-bold text-secondary">{dayPlan.dailyTotals.fat}g</p><p className="text-gray-400">Fat</p></div>
                 </div>
            </Card>
            <ul className="space-y-4">
                {dayPlan.meals.map((meal, i) => (
                     <li key={i} className="py-3 px-4 bg-base-300/50 rounded-lg">
                        <h4 className="font-semibold text-lg text-secondary">{meal.name}</h4>
                        <p className="text-gray-300 text-sm my-1">{meal.description}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mt-2 text-gray-400">
                           <p>🔥 {meal.calories}</p>
                           <p>P: {meal.macros.protein}g</p>
                           <p>C: {meal.macros.carbs}g</p>
                           <p>F: {meal.macros.fat}g</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-base-300/50 space-y-2 text-xs text-gray-400">
                           <p><strong>Taste:</strong> {meal.tasteProfile}</p>
                           <p><strong>Texture:</strong> {meal.texture}</p>
                           <p><strong>Variations:</strong> {meal.flavorVariations}</p>
                           <p><strong>Prep:</strong> {meal.prepInstructions}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );


  return (
    <div className="animate-fadeIn space-y-6">
        <Card>
             <div className="p-4 flex border-b border-base-300">
                <button onClick={() => setActiveTab('workout')} className={`flex-1 py-2 text-center font-bold transition-all duration-300 active:scale-95 rounded-t-lg hover:bg-base-300/20 hover:-translate-y-1 ${activeTab === 'workout' ? 'text-primary border-b-2 border-primary bg-base-300/10' : 'text-gray-400'}`}>Workout Plan</button>
                <button onClick={() => setActiveTab('meal')} className={`flex-1 py-2 text-center font-bold transition-all duration-300 active:scale-95 rounded-t-lg hover:bg-base-300/20 hover:-translate-y-1 ${activeTab === 'meal' ? 'text-primary border-b-2 border-primary bg-base-300/10' : 'text-gray-400'}`}>Meal Plan</button>
            </div>
            <div className="p-4 sm:p-6">
                {activeTab === 'workout' && (
                    <div className="space-y-4">
                       <DaySelector planDays={plan.workoutPlan.map(p => p.day)} onSelect={(day) => {setActiveDay(day); setExpandedExercise(null);}} currentDay={activeDay} />
                       <WorkoutDetails dayPlan={plan.workoutPlan[activeDay]} />
                    </div>
                )}
                {activeTab === 'meal' && (
                    <div className="space-y-4">
                        <DaySelector planDays={plan.mealPlan.map(p => p.day)} onSelect={setActiveDay} currentDay={activeDay} />
                        <MealDetails dayPlan={plan.mealPlan[activeDay]} />
                    </div>
                )}
            </div>
        </Card>
    </div>
  );
};

export default PlanDisplay;