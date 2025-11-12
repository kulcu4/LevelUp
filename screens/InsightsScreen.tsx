import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import Card from '../components/ui/Card';
import { DailyLog } from '../types';
import { generateProgressForecast } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import { BrainIcon } from '../components/ui/Icons';

// A simple chart component using divs
const BarChart: React.FC<{ data: { label: string; value: number; goal: number }[], color: string }> = ({ data, color }) => (
    <div className="h-48 flex items-end justify-around p-2 bg-base-300/50 rounded-lg">
        {data.map((d, i) => (
            <div key={i} className="flex flex-col items-center w-1/8">
                <div 
                    className="w-full rounded-t-md transition-all duration-500" 
                    style={{ height: `${Math.min(100, (d.value / d.goal) * 100)}%`, backgroundColor: color }}
                ></div>
                <span className="text-xs mt-1 text-gray-400">{d.label}</span>
            </div>
        ))}
    </div>
);

interface InsightsScreenProps {
    dailyLog: DailyLog;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ dailyLog }) => {
    const [forecast, setForecast] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateForecast = async () => {
        setIsLoading(true);
        setError(null);
        setForecast(null);
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const generatedForecast = await generateProgressForecast(ai, dailyLog); // We only have one day of data for now, but this can be expanded
            setForecast(generatedForecast);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    // Mock weekly data for chart demonstration
    const weeklyCalories = [
        { label: 'M', value: 2400, goal: 2500 }, { label: 'T', value: 2600, goal: 2500 },
        { label: 'W', value: 2300, goal: 2500 }, { label: 'T', value: 2550, goal: 2500 },
        { label: 'F', value: 2700, goal: 2500 }, { label: 'S', value: 2800, goal: 2500 },
        { label: 'S', value: dailyLog.calories, goal: 2500 }
    ];
    const weeklyProtein = [
        { label: 'M', value: 140, goal: 150 }, { label: 'T', value: 155, goal: 150 },
        { label: 'W', value: 130, goal: 150 }, { label: 'T', value: 160, goal: 150 },
        { label: 'F', value: 145, goal: 150 }, { label: 'S', value: 170, goal: 150 },
        { label: 'S', value: dailyLog.protein, goal: 150 }
    ];

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Insights & Forecasts</h1>
        <p className="text-gray-400">Track your progress and see what's ahead.</p>
      </header>
      
      <Card>
        <div className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Weekly Calorie Intake</h2>
            <BarChart data={weeklyCalories} color="#ff6500" />
        </div>
      </Card>

      <Card>
        <div className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Weekly Protein Intake (g)</h2>
            <BarChart data={weeklyProtein} color="#F87171" />
        </div>
      </Card>

      <Card>
         <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-3 mb-4">
               <div className="text-primary"><BrainIcon /></div>
               <h2 className="text-xl font-semibold text-white">AI Progress Forecast</h2>
            </div>
             <p className="text-gray-400 mb-4">
                Based on your recent activity and logs, let's predict your progress for the next 30 days.
            </p>
            
            {isLoading && <div className="flex justify-center"><Spinner /></div>}
            
            {error && <p className="text-red-400">{error}</p>}

            {forecast && (
                <div className="p-4 bg-base-300/50 rounded-lg text-gray-300 whitespace-pre-wrap font-mono">
                    {forecast}
                </div>
            )}
            
            {!isLoading && (
                 <button onClick={handleGenerateForecast} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 active:scale-95 hover:-translate-y-1 mt-4">
                    {forecast ? "Regenerate Forecast" : "Generate Forecast"}
                </button>
            )}
        </div>
      </Card>
    </div>
  );
};

export default InsightsScreen;