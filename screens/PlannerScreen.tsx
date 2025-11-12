
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserProfile, FitnessPlan } from '../types';
import { generateFitnessPlan } from '../services/geminiService';
import PlannerForm from '../components/planner/PlannerForm';
import PlanDisplay from '../components/planner/PlanDisplay';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';

const PlannerScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'gain_muscle',
  });
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProfileChange = useCallback((field: keyof UserProfile, value: string | number) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const generatedPlan = await generateFitnessPlan(ai, userProfile);
      setPlan(generatedPlan);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">AI Plan Generator</h1>
        <p className="text-gray-400">Fill in your details to get a personalized workout and meal plan.</p>
      </header>

      {!plan && !isLoading && (
        <PlannerForm
          profile={userProfile}
          onProfileChange={handleProfileChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner />
          <p className="mt-4 text-lg">Generating your personalized plan...</p>
          <p className="text-gray-400">This might take a moment.</p>
        </div>
      )}

      {error && (
        <Card className="bg-red-900/50 border border-red-500 p-4">
          <h3 className="font-bold text-red-400">Generation Failed</h3>
          <p className="text-red-300">{error}</p>
          <button onClick={handleSubmit} className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-all">
            Try Again
          </button>
        </Card>
      )}

      {plan && (
        <>
            <PlanDisplay plan={plan} />
             <div className="text-center mt-6">
                 <button 
                     onClick={() => setPlan(null)} 
                     className="bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                 >
                     Generate a New Plan
                 </button>
             </div>
        </>
      )}
    </div>
  );
};

export default PlannerScreen;
