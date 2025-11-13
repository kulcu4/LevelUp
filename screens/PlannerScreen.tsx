import React, { useState, useCallback, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserProfile, FitnessPlan } from '../types';
import { generateInitialPlan, generateRemainingPlan } from '../services/geminiService';
import PlanDisplay from '../components/planner/PlanDisplay';
import Spinner from '../components/ui/Spinner';
import Card from '../components/ui/Card';
import PlannerForm from '../components/planner/PlannerForm';

interface PlannerScreenProps {
  onPlanGenerated: (plan: FitnessPlan, profile: UserProfile, maintenance: number) => void;
}

const PlannerScreen: React.FC<PlannerScreenProps> = ({ onPlanGenerated }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 30,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'gain_muscle',
    dietaryPreference: 'omnivore',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingFullPlan, setIsGeneratingFullPlan] = useState(false);

  const handleProfileChange = useCallback((field: keyof UserProfile, value: string | number) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const maintenanceCalories = useMemo(() => {
    // Harris-Benedict Equation for BMR
    const bmr = userProfile.gender === 'male'
      ? 88.362 + (13.397 * userProfile.weight) + (4.799 * userProfile.height) - (5.677 * userProfile.age)
      : 447.593 + (9.247 * userProfile.weight) + (3.098 * userProfile.height) - (4.330 * userProfile.age);

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    
    return Math.round(bmr * activityMultipliers[userProfile.activityLevel]);
  }, [userProfile]);


  const handleSubmit = async () => {
    setIsLoading(true);
    setLoadingMessage("Generating your first day...");
    setError(null);
    setPlan(null);
    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Stage 1: Generate initial plan (Day 1)
      const initialPlan = await generateInitialPlan(ai, userProfile, maintenanceCalories);
      setPlan(initialPlan);
      onPlanGenerated(initialPlan, userProfile, maintenanceCalories);
      setIsLoading(false);

      // Stage 2: Generate the rest of the plan in the background
      setIsGeneratingFullPlan(true);
      const remainingPlan = await generateRemainingPlan(ai, userProfile, maintenanceCalories, initialPlan);
      
      const fullPlan: FitnessPlan = {
          workoutPlan: [...initialPlan.workoutPlan, ...remainingPlan.workoutPlan],
          mealPlan: [...initialPlan.mealPlan, ...remainingPlan.mealPlan]
      };
      setPlan(fullPlan);
      onPlanGenerated(fullPlan, userProfile, maintenanceCalories);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setIsLoading(false);
    } finally {
        setIsGeneratingFullPlan(false);
    }
  };
  
  const resetPlan = () => {
    setPlan(null);
    setError(null);
    setCurrentStep(1);
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-white">AI Plan Generator</h1>
        <p className="text-gray-400">
            {plan ? "Your personalized plan is ready!" : "Let's create a plan tailored just for you."}
        </p>
      </header>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center h-64">
          <Spinner />
          <p className="mt-4 text-lg">{loadingMessage}</p>
          <p className="text-gray-400">This might take a moment.</p>
        </div>
      )}

      {error && (
        <Card className="bg-red-900/50 border border-red-500 p-4">
          <h3 className="font-bold text-red-400">Generation Failed</h3>
          <p className="text-red-300">{error}</p>
          <button onClick={handleSubmit} className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 active:scale-95 hover:-translate-y-1">
            Try Again
          </button>
        </Card>
      )}

      {!plan && !isLoading && !error && (
        <PlannerForm 
            profile={userProfile}
            onProfileChange={handleProfileChange}
            onSubmit={handleSubmit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            maintenanceCalories={maintenanceCalories}
        />
      )}

      {plan && (
        <>
            <PlanDisplay plan={plan} isGeneratingFullPlan={isGeneratingFullPlan}/>
             <div className="text-center mt-6">
                 <button 
                     onClick={resetPlan} 
                     className="bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-100"
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