import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { LoggedMeal } from '../types';
import { getNutritionalInfoForFood } from '../services/geminiService';

interface LogMealScreenProps {
  onLogMeal: (meal: LoggedMeal) => void;
}

const LogMealScreen: React.FC<LogMealScreenProps> = ({ onLogMeal }) => {
  const [foodName, setFoodName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nutritionInfo, setNutritionInfo] = useState<LoggedMeal | null>(null);

  const handleSearch = async () => {
    if (!foodName.trim()) {
      setError("Please enter a food name.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setNutritionInfo(null);
    try {
      if (!process.env.API_KEY) throw new Error("API key not configured.");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const data = await getNutritionalInfoForFood(ai, foodName);
      setNutritionInfo({ name: foodName, ...data });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLog = () => {
    if (nutritionInfo) {
      onLogMeal(nutritionInfo);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">Log a Meal</h1>
        <p className="text-gray-400">Search for a food to get its nutritional info.</p>
      </header>
      
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="e.g., '1 cup of cooked rice' or 'Apple'"
              className="flex-grow bg-base-300/70 border border-base-300 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Spinner /> : 'Search'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </Card>
      
      {nutritionInfo && (
        <Card className="animate-fadeIn">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-white capitalize">{nutritionInfo.name}</h2>
                <p className="text-gray-400 text-sm mb-4">Nutritional information per serving:</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-base-300 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">{nutritionInfo.calories}</p>
                        <p className="text-sm text-gray-400">Calories</p>
                    </div>
                     <div className="bg-base-300 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-accent">{nutritionInfo.protein}g</p>
                        <p className="text-sm text-gray-400">Protein</p>
                    </div>
                     <div className="bg-base-300 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-gray-300">{nutritionInfo.carbs}g</p>
                        <p className="text-sm text-gray-400">Carbs</p>
                    </div>
                     <div className="bg-base-300 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-gray-300">{nutritionInfo.fat}g</p>
                        <p className="text-sm text-gray-400">Fat</p>
                    </div>
                </div>
                <button onClick={handleLog} className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 active:scale-95 hover:-translate-y-1">
                    Add to Daily Log
                </button>
            </div>
        </Card>
      )}

      <div className="text-center text-gray-500 my-2">OR</div>

        <Card>
            <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-white">Log with a Photo</h2>
                <p className="text-gray-400 my-2">Upload or scan an image of your meal and let AI do the work.</p>
                <button
                    disabled // Feature coming soon
                    className="mt-2 bg-teal-400/50 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Upload Image (Coming Soon)
                </button>
            </div>
        </Card>

    </div>
  );
};

export default LogMealScreen;
