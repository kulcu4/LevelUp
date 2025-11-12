import React, { useState } from 'react';
import { FitnessPlan, DailyWorkout, DailyMealPlan } from '../../types';
import Card from '../ui/Card';

const PlanDisplay: React.FC<{ plan: FitnessPlan }> = ({ plan }) => {
    const [activeTab, setActiveTab] = useState<'workout' | 'meal'>('workout');
    const [activeDay, setActiveDay] = useState<number>(0);

    const DaySelector: React.FC<{planDays: string[], onSelect: (index: number) => void, currentDay: number}> = ({planDays, onSelect, currentDay}) => (
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
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
    );

    const WorkoutDetails: React.FC<{ dayPlan: DailyWorkout }> = ({ dayPlan }) => (
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{dayPlan.focus}</h3>
            {!dayPlan.exercises || dayPlan.exercises.length === 0 ? (
                 <p className="text-gray-400">Rest day! Enjoy your recovery.</p>
            ) : (
                <ul className="divide-y divide-base-300">
                    {dayPlan.exercises.map((ex, i) => (
                        <li key={i} className="py-4">
                            <h4 className="font-semibold text-lg text-secondary">{ex.name}</h4>
                            <div className="grid grid-cols-3 gap-2 text-sm mt-2">
                                <p><span className="font-bold">Sets:</span> {ex.sets}</p>
                                <p><span className="font-bold">Reps:</span> {ex.reps}</p>
                                <p><span className="font-bold">Rest:</span> {ex.rest}</p>
                            </div>
                            <p className="text-gray-400 mt-2 text-sm italic">Tip: {ex.tips}</p>
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
                       <DaySelector planDays={plan.workoutPlan.map(p => p.day)} onSelect={setActiveDay} currentDay={activeDay} />
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